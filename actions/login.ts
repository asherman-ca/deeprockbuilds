'use server'
import { signIn } from '@/auth'

export const login = async () => {
	try {
		signIn('google', {
			callbackUrl: '/',
		})
	} catch (error) {
		console.log('error', error)
	}
}
