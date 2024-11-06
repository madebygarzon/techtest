import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Auth0Provider from "next-auth/providers/auth0";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

const prisma = new PrismaClient();
const supabase = createClient(process.env.SUPABASE_URL || 'null', process.env.SUPABASE_KEY || 'null');

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // Buscar el usuario en la tabla `users` de Supabase
        const { data: user, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", credentials?.email)
          .single();

        if (error || !user) {
          throw new Error("Usuario no encontrado");
        }

        // Comparar la contraseña con bcrypt
        const isPasswordValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isPasswordValid) {
          throw new Error("Contraseña incorrecta");
        }

        // Retornar los datos del usuario para la sesión
        return { id: user.id, name: user.name, email: user.email, role: user.role };
      },
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID as string,
      clientSecret: process.env.AUTH0_CLIENT_SECRET as string,
      issuer: process.env.AUTH0_ISSUER as string,
    }),
  ],
  
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, user }) {
      session.userId = user.id;
      session.user = { ...session.user, role: user.role };
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});
