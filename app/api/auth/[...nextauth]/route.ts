// app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials"

// Define interfaces for user and token to avoid using 'any'
interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface IToken extends JWT {
  id: string;
  role: string;
}

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

          // --- MODIFIED SECTION FOR ROBUST ERROR HANDLING ---

          // 1. Check if the response is successful BEFORE parsing JSON
          if (!res.ok) {
            // The backend returned an error (e.g., 401, 500).
            // We can try to get an error message if the backend sent one.
            const errorData = await res.json().catch(() => null); // Gracefully handle if error response isn't JSON
            console.error('[NextAuth Authorize] Backend returned an error:', { status: res.status, data: errorData });
            return null; // Always return null on failure
          }

          // 2. If the response is OK, then parse the JSON
          const responseData = await res.json();

          console.log('[NextAuth Authorize] Response from backend:', responseData);

          if (responseData.success && responseData.user) {
            console.log('[NextAuth Authorize] Login successful. Returning user object.');
            // We cast here to ensure the object matches our IUser interface
            return responseData.user as IUser;
          } else {
            console.log('[NextAuth Authorize] Login failed according to backend response.');
            return null;
          }
          // --- END OF MODIFIED SECTION ---

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
      // On sign-in, the 'user' object is passed. We use it to populate the token.
      if (user) {
        const customUser = user as IUser;
        token.role = customUser.role;
        token.id = customUser.id;
      }
      return token;
    },
    async session({ session, token }) {
      // The session object's user property is what the client-side sees.
      // We add the role and id from the token to the session.
      if (session?.user) {
        const customToken = token as IToken;
        // Extend the default session user type to include our custom fields
        const sessionUser = session.user as IUser;
        sessionUser.role = customToken.role;
        sessionUser.id = customToken.id;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
