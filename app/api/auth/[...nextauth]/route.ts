// app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifyTwoFactorToken } from "@/lib/auth/2fa";

// Basit rate limit
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  // ❗ NextAuth v5 uyumlu
  session: {
    strategy: SessionStrategy.JWT,
    maxAge: 30 * 24 * 60 * 60,
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
        code: { label: "2FA Code", type: "text" },
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Lütfen email ve şifre giriniz.");
        }

        const email = credentials.email;
        const now = Date.now();

        const record = loginAttempts.get(email) || {
          count: 0,
          lastAttempt: now,
        };

        if (
          record.count >= MAX_ATTEMPTS &&
          now - record.lastAttempt < RATE_LIMIT_WINDOW
        ) {
          throw new Error("Çok fazla deneme yaptınız. Lütfen 15 dakika bekleyin.");
        }

        // kullanıcı bul
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash) {
          await bcrypt.compare(
            "dummy",
            "$2a$10$dummyhashdummyhashdummyhash"
          );
          loginAttempts.set(email, {
            count: record.count + 1,
            lastAttempt: now,
          });
          throw new Error("Email veya şifre hatalı.");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValid) {
          loginAttempts.set(email, {
            count: record.count + 1,
            lastAttempt: now,
          });
          throw new Error("Email veya şifre hatalı.");
        }

        // 2FA kontrolü
        if (user.twoFactorEnabled) {
          if (!credentials.code) {
            throw new Error("2FA_REQUIRED");
          }

          const is2FAValid = verifyTwoFactorToken(
            credentials.code,
            user.twoFactorSecret || ""
          );

          if (!is2FAValid) {
            loginAttempts.set(email, {
              count: record.count + 1,
              lastAttempt: now,
            });
            throw new Error("2FA kodu hatalı.");
          }
        }

        loginAttempts.delete(email);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
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
    },
  },
};

// ❗ NEXTAUTH v5 doğru export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
