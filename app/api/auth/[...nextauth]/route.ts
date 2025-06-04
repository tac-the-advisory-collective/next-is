import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { verifyUser } from '@/app/(core)/auth/services/authService'

const handler = NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const user = await verifyUser(credentials.email, credentials.password)
        return user || null // ⬅️ do not throw
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export { handler as GET, handler as POST }
