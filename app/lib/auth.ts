// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

// Define interfaces for user and token to avoid using 'any'
interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface IToken extends JWT {
  id:string;
  role: string;
}

// Export authOptions so it can be used in your API route and layout
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        console.log('[NextAuth Authorize] Attempting to log in user:', credentials.email);

        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!res.ok) {
            const errorData = await res.json().catch(() => null);
            console.error('[NextAuth Authorize] Backend returned an error:', { status: res.status, data: errorData });
            return null;
          }

          const responseData = await res.json();

          if (responseData.success && responseData.user) {
            return responseData.user as IUser;
          } else {
            return null;
          }

        } catch (error) {
          console.error("[NextAuth Authorize] A fetch error occurred:", error);
          return null;
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const customUser = user as IUser;
        token.role = customUser.role;
        token.id = customUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        const customToken = token as IToken;
        const sessionUser = session.user as IUser;
        sessionUser.role = customToken.role;
        sessionUser.id = customToken.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};
