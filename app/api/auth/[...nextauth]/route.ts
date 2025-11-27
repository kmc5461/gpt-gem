// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// ❌ authOptions EXPORT YOK
// ❌ Fazladan export YOK

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
    error: "/auth/error",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Lütfen email ve şifre giriniz.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Email veya şifre hatalı.");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash
        );

        if (!isValid) {
          throw new Error("Email veya şifre hatalı.");
        }

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
});

// ✔ TEK export formatı
export { handler as GET, handler as POST };
