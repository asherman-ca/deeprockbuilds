'use server'
import { signIn } from '@/auth'
import { db } from '@/lib/db'

export const login = async () => {
	try {
		signIn('google', {
			callbackUrl: '/',
		})
	} catch (error) {
		console.log('error', error)
	}
}
