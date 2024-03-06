import { auth } from '@/auth'
import React from 'react'

const page = async () => {
	const session = await auth()

	return <div>page</div>
}

export default page
