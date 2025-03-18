import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";

const GRAPHQL_API_URL = process.env.NEXT_PUBLIC_GRAPHQL_API_URL; // GraphQL API URL

const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        const userCookies = await cookies();
        const userRole = userCookies.get("userRole")?.value || "worker"; // Default to worker
        token.role = userRole;

        // Call GraphQL API to create user
        if (!GRAPHQL_API_URL) {
          throw new Error("GRAPHQL_API_URL is not defined");
        }
        await fetch(GRAPHQL_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
              mutation CreateUser($email: String!, $name: String!, $password: String!, $role: String!) {
                createUser(email: $email, name: $name, password: $password, role: $role) {
                  id
                  email
                  name
                  role
                }
              }
            `,
            variables: {
              email: user.email,
              name: user.name,
              password: "someSecureGeneratedPassword", // Google login doesn't provide password
              role: userRole,
            },
          }),
        }).catch((err) => console.error("Error creating user:", err));
      }
      return token;
    },

    async session({ session, token }:any) {
      session.user.role = token.role || null;
      return session;
    },
  },
};

export default NEXT_AUTH_CONFIG;
