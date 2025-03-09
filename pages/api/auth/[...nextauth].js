import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub; // Ajoute l'ID utilisateur à la session
      return session;
    },
  },
};

export default NextAuth(authOptions);
