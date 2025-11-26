import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { verifyTwoFactorToken } from "@/lib/auth/2fa";

const loginAttempts = new Map();
const MAX_ATTEMPTS = 5;
const WINDOW = 15 * 60 * 1000;

const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Lütfen email ve şifre giriniz.");
        }

        const email = credentials.email;
        const now = Date.now();
        const record = loginAttempts.get(email) || { count: 0, last: now };

        if (record.count >= MAX_ATTEMPTS && now - record.last < WINDOW) {
          throw new Error("Çok fazla deneme! 15 dakika bekleyin.");
        }

        const user = await prisma.user.findUnique({ where: { email } });

        if (!user || !user.passwordHash) {
          await bcrypt.compare("dummy", "$2a$10$dummyhashdummyhashdummyhash");
          loginAttempts.set(email, { count: record.count + 1, last: now });
          throw new Error("Email veya şifre yanlış.");
        }

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!valid) {
          loginAttempts.set(email, { count: record.count + 1, last: now });
          throw new Error("Email veya şifre yanlış.");
        }

        if (user.twoFactorEnabled) {
          if (!credentials.code) {
            throw new Error("2FA_REQUIRED");
          }

          const ok = verifyTwoFactorToken(credentials.code, user.twoFactorSecret || "");
          if (!ok) throw new Error("2FA kodu yanlış.");
        }

        loginAttempts.delete(email);

        return {
          id: user.id,
          role: user.role,
          email: user.email,
          name: user.name,
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
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
