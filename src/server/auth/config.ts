import { PrismaAdapter } from "@auth/prisma-adapter";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { db } from "@/server/db";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { compare } from "bcrypt";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        console.log("Authorizing credentials:", { email: credentials?.email });
        
        const parsedCredentials = z.object({ email: z.string().email(), password: z.string().min(8) }).parse(credentials);
        const user = await db.user.findUnique({
          where: { email: parsedCredentials.email },
        });
        
        console.log("Found user:", user ? { id: user.id, email: user.email } : null);
        
        if (!user?.password) {
          console.log("No user found or no password");
          return null;
        }
        
        // Verify the password
        const isPasswordValid = await compare(parsedCredentials.password, user.password as string);
        console.log("Password valid:", isPasswordValid);
        
        if (!isPasswordValid) return null;
        
        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
  adapter: PrismaAdapter(db),
  callbacks: {
    jwt: async ({ token, user }) => {
      console.log("JWT callback:", { token, user });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      console.log("Session callback:", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
  pages: {
    signIn: "/auth/login",
    signOut: "/",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
  cookies: {
    sessionToken: {
      name: `michalmilek-sessiontoken`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    callbackUrl: {
      name: `michalmilek-callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    },
    csrfToken: {
      name: `michalmilek-csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  debug: true, // Enable debug logs
} satisfies NextAuthConfig;
