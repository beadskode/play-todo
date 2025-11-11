import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Google,
    GitHub,
    Naver,
    Kakao,
    Credentials({
      credentials: {
        email: {},
        pw: {},
      },
      async authorize(credentials) {
        console.log("🐼 ~ credentials:", credentials);
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      console.log("🐼 ~ user:", user);
      console.log("🐼 ~ profile:", profile);
      console.log("🐼 ~ account:", account);
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
      }
      return session;
    },
  },
  trustHost: true,
  jwt: { maxAge: 30 * 60 },
  pages: {
    // signIn: "/sign",
    error: "/sign/error",
  },
  secret: process.env.AUTH_SECRET as string,
});
