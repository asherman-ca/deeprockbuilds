import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import google from 'next-auth/providers/google'

export const config = {
	providers: [google],
	basePath: '/auth',
	callbacks: {},
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(config)
