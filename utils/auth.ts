// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { NextAuthOptions } from "next-auth";
// import { CredentialsProvider } from "next-auth/providers/credentials";
// import { prisma } from "./connect";
// import { compare } from "bcrypt";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   session: {
//     strategy: "jwt"
//   },
//     pages: {
//     signIn: '/signin',
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         username: { label: "Username", type: "text" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
//         if (!credentials?.username || !credentials?.password) {
//           console.log(credentials?.username)
//           return null;
//         }
//         const existingUser = await prisma.utilisateur.findMany({ where: { motDePasse: credentials?.password } })
//         if (!existingUser[0]) {
//           return null;
//         }
    
//         const passwordMatch = await compare(credentials?.password, existingUser[0].motDePasse);
    
//         if (!passwordMatch) {
//           return null;
//         }
    
//         if (existingUser[0].blocke = "true") {
//           return null;
//         }
      
//         return {
//           id: existingUser[0].id,
//           username: existingUser[0].nomUtilisateur,
//           employeId: existingUser[0].employeId
//         }
    
//       }
//     })
//   ] 
// }