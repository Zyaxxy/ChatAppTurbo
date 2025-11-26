import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users = [
          {
            id: "1",
            name: "Utkarsh",
            email: "utkarsh@example.com",
            password: await bcrypt.hash("123456", 10),
          },
        ];

        const user = users.find((u) => u.email === credentials?.email);
        if (!user) throw new Error("User not found");

        const valid = await bcrypt.compare(credentials!.password, user.password);
        if (!valid) throw new Error("Invalid credentials");

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token.user) {
        session.user = token.user as User;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
