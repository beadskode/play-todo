import NextAuth, { type User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
import z from "zod";
import prisma from "./db";

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
        const { email, pw } = credentials;
        const validator = z
          .object({
            email: z.email("잘못된 이메일 형식입니다."),
            pw: z.string().min(8, "비밀번호는 8자 이상 입력해주세요."),
          })
          .safeParse({ email, pw });

        if (!validator.success) {
          console.log("Error: ", validator.error);
          return null;
        }
        return { email, pw } as User;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      const isCredential = account?.provider === "credentials";
      console.log("🐼 ~ user:", user);
      console.log("🐼 ~ profile:", profile);
      console.log("🐼 ~ isCredential:", isCredential);

      const { email, name, image } = user;

      if (!email) return false;

      const member = await prisma.member.findUnique({ where: { email } });
      console.log("member: ", member);

      return true;
    },
    async jwt({ token, user, trigger, account, session }) {
      console.log("account: ", account);
      // token, user는 Credential 사용 시 전달 / Session은 trigger가 update인 경우 전달
      // update = 변경된 정보로 세션과 토큰 갱신
      const userData = trigger === "update" ? session : user;
      if (userData) {
        token.id = userData.id;
        token.email = userData.email;
        token.name = userData.name || userData.nickname;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id?.toString() || "";
        session.user.name = token.name;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  trustHost: true,
  jwt: { maxAge: 30 * 60 },
  pages: {
    signIn: "/sign",
    error: "/sign/error",
  },
  secret: process.env.AUTH_SECRET as string,
});
