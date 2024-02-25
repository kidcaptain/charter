import NextAuth from "next-auth/next";
import { DefaultUser, NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/utils/connect";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: '/signin',
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                 const existingUser = await prisma.utilisateur.findMany({ where: { nomUtilisateur: credentials?.username } })
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }
                if (!existingUser[0]) {
                    return null;
                }

                const passwordMatch = await compare(`${credentials?.password}`, `${existingUser[0]?.motDePasse}`);

                if (!passwordMatch) {
                    return null;
                }

                if (existingUser[0]?.blocke == "true") {
                    return null;
                }  
                
                const user : DefaultUser = { id: existingUser[0]?.id.toString(), name: existingUser[0]?.nomUtilisateur, email: existingUser[0]?.id.toString(), image: existingUser[0]?.droitsAccesId.toString() }
                return user

            }
        })
    ],
    callbacks: {
        async jwt({token, user, account, profile, isNewUser}) {
            if (user) {
                return {
                    ...token,
                    username: user.name
                } 
            }
            return token
        },
        async session ({session, user, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.name
                }
            }
        }
    }
}

const handler = NextAuth(authOptions); 

export { handler as GET, handler as POST }