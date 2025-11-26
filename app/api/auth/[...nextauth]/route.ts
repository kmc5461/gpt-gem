// app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma"; // Prisma client yolunuz
import bcrypt from "bcryptjs";
import { verifyTwoFactorToken } from "@/lib/auth/2fa";

// Basit in-memory rate limit (Production için Redis kullanın)
const loginAttempts = new Map<string, { count: number, lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 dakika
const MAX_ATTEMPTS = 5;

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 gün
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
    verifyRequest: "/auth/verify",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        code: { label: "2FA Code", type: "text" } // 2FA kodu opsiyonel
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Lütfen email ve şifre giriniz.");
        }

        const ip = "127.0.0.1"; // Next.js middleware veya req.headers'dan alınmalı
        const email = credentials.email;
        const now = Date.now();

        // Brute-Force Koruması
        const record = loginAttempts.get(email) || { count: 0, lastAttempt: now };
        if (record.count >= MAX_ATTEMPTS && now - record.lastAttempt < RATE_LIMIT_WINDOW) {
          throw new Error("Çok fazla deneme yaptınız. Lütfen 15 dakika bekleyin.");
        }

        // Kullanıcıyı bul
        const user = await prisma.user.findUnique({
          where: { email }
        });

        if (!user || !user.passwordHash) {
          // Timing attack önlemek için sahte verify
          await bcrypt.compare("dummy", "$2a$10$dummyhashdummyhashdummyhash");
          loginAttempts.set(email, { count: record.count + 1, lastAttempt: now });
          throw new Error("Email veya şifre hatalı.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          loginAttempts.set(email, { count: record.count + 1, lastAttempt: now });
          throw new Error("Email veya şifre hatalı.");
        }

        // 2FA Kontrolü
        if (user.twoFactorEnabled) {
          if (!credentials.code) {
            // Frontend'e 2FA gerektiğini bildiren özel bir hata atılabilir
            // Ancak NextAuth'da genelde akış UI tarafında yönetilir.
            // Burada basitçe kod yoksa hata dönüyoruz.
            throw new Error("2FA_REQUIRED"); 
          }

          const is2FAValid = verifyTwoFactorToken(credentials.code, user.twoFactorSecret || "");
          if (!is2FAValid) {
            loginAttempts.set(email, { count: record.count + 1, lastAttempt: now });
            throw new Error("2FA kodu hatalı.");
          }
        }

        // Başarılı giriş, sayacı sıfırla
        loginAttempts.delete(email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // İlk girişte user objesi doludur
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
export { authOptions };
