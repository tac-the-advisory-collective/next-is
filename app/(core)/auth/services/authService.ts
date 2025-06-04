"use server"

// app/(core)/auth/services/authService.ts
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function verifyUser(email: string, password: string) {
  try {
    const user = await prisma.user_user.findUnique({
      where: { email },
    })

    if (!user) return null

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return null

    return {
      id: user.id,
      email: user.email,
    }
  } catch (error) {
    console.error('Prisma Error in verifyUser:', error)
    return null
  }
}
