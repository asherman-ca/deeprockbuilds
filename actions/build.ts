'use server'

import { auth } from '@/auth'

export const newBuild = async (payload) => {
	console.log('server hits')
	// const user = auth()

	return { success: 'success' }
}
