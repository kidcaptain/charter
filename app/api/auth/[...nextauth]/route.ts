import NextAuth from "next-auth/next";
import { DefaultUser, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/connect";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { authOptions } from "@/app/lib/authOptions";


export const handler = NextAuth(authOptions) as never; 

export { handler as GET, handler as POST}
  