// lib/auth/options.ts
import CredentialsProvider from 'next-auth/providers/credentials'
import type { AuthOptions } from 'next-auth'
import { verifyUser } from '@/app/(core)/auth/services/authService'
import { JWT } from 'next-auth/jwt'

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null
        const user = await verifyUser(credentials.email, credentials.password)
        return user || null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id
        token.email = user.email
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
        }
      }
      return session
    },
  },
  pages: {
    signIn: '/signin', // You can create this page separately
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default authOptions
