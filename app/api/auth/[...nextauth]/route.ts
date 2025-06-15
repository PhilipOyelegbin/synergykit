import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import * as argon from "argon2";
import { prisma } from "../..";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials?.email },
          });
          if (!user) {
            throw new Error("Invalid details");
          }

          const isPasswordCorrect = await argon.verify(
            user.password,
            credentials?.password ?? ""
          );

          if (!isPasswordCorrect) {
            throw new Error("Invalid details");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            isVerified: user.isVerify,
          };
        } catch (err) {
          throw new Error(`${err}`);
        }
      },
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_SECRET}`,
    }),
  ],

  callbacks: {
    // This callback is fired when a JWT is created (on sign in) or updated.
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.isVerified = user?.isVerified;
        if (account) {
          token.accessToken = account.access_token;
        }
      }
      return token;
    },
    // This callback is fired whenever a session is checked (e.g., on page load, `useSession`)
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token?.id;
        session.user.isVerified = token?.isVerified;
      }
      return session;
    },
  },
  // --- Pages: Custom login/error pages ---
  pages: {
    signIn: "/auth/login",
    // error: "/auth/error", // Optional: Custom error page
  },
  // --- Secret: REQUIRED for signing and encrypting session cookies ---
  secret: process.env.NEXTAUTH_SECRET,
  // --- Session Strategy: 'jwt' is recommended for stateless apps ---
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: false,
});

export { handler as GET, handler as POST };
