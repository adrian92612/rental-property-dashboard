import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "@/app/lib/prisma";
import { createId } from "@paralleldrive/cuid2";
import { AdapterUser } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET,
  adapter: {
    ...PrismaAdapter(prisma),
    createUser: async (data: any) => {
      data.id = createId();
      return prisma.user.create({ data });
    },
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;

      const redirectIfLoggedIn = ["/", "/login", "/register"];
      const isOnProtectedPage = pathname.startsWith("/dashboard");

      if (isLoggedIn && redirectIfLoggedIn.includes(pathname)) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      if (!isLoggedIn && isOnProtectedPage) {
        return Response.redirect(new URL("/login", nextUrl));
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return { id: token.id };
    },
    async session({ session, token }) {
      // session.user.id = token.id as string;
      session.user = { id: token.id as string } as AdapterUser & { id: string };
      return session;
    },
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          image: profile.picture,
          emailVerified: profile.email_verified,
        };
      },
    }),
  ],
});
