import { DefaultSession, DefaultUser } from "next-auth";
// import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and `getServerSession`
   * The `session` object itself is what you access in your components.
   */
  interface Session {
    user: {
      id: string;
      isVerified?: boolean;
    } & DefaultSession["user"];
  }

  /**
   * The `user` object passed to the `jwt` callback from `authorize` or OAuth provider
   */
  interface User extends DefaultUser {
    id: string;
    isVerified?: boolean;
  }
}

declare module "next-auth/jwt" {
  /**
   * The `token` object that gets stored in the session cookie
   * and passed to the `session` callback.
   */
  interface JWT {
    id: string;
    isVerified?: boolean;
    accessToken?: string;
  }
}
