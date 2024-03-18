'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { mock } from 'node:test'

export const newBuild = async (payload: any) => {
	const user = await auth()

	if (!user || !user.user) {
		return { error: 'not authenticated' }
	}

	const dbPayload: any = {
		name: payload.name,
		description: payload.description,
		spec: {
			connect: {
				id: payload.spec.id,
			},
		},
		class: {
			connect: {
				id: payload.spec.classId,
			},
		},
		user: {
			connect: {
				id: user.user.id,
			},
		},
	}

	console.log(dbPayload)

	const build = await db.build.create({
		data: dbPayload,
	})

	return { success: 'success' }
}
