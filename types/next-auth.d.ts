// types/next-auth.d.ts

import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    login?: string;
    nodeId?: string;
    accessToken?: string;
  }
}

declare module "next-auth" {
  interface User extends DefaultUser {
    login?: string;
    nodeId?: string;
  }

  interface Session extends DefaultSession {
    user?: User;
    accessToken?: string;
  }
}