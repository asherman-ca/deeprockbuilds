import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import Google from 'next-auth/providers/google'
import { db } from './lib/db'
import { getUserById } from './data/user'
import { getAccountByUserId } from './data/account'

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	callbacks: {
		async jwt({ token }) {
			if (!token.sub) return token

			const existingUser = await getUserById(token.sub)

			if (!existingUser) return token

			const existingAccount = await getAccountByUserId(existingUser.id)

			token.isOAuth = !!existingAccount
			token.name = existingUser.name
			token.email = existingUser.email
			// token.role = existingUser.role
			// token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled

			return token
		},
	},
	adapter: PrismaAdapter(db),
	session: { strategy: 'jwt' },
})
