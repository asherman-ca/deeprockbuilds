'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

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
		artifacts: {
			connect: payload.artifacts.map((a: any) => {
				return {
					id: a.id,
				}
			}),
		},
	}

	const { id: buildId } = await db.build.create({
		data: dbPayload,
	})

	Object.values(payload.weapons)
		.filter((w) => w !== null)
		.forEach(async (w: any) => {
			const weaponRes = await db.buildWeapon.create({
				data: {
					buildId,
					weaponId: w.id,
				},
			})

			const overClocks = w.selectedOverclocks.map((o: any) => {
				return {
					overclockId: o.id,
					buildWeaponId: weaponRes.id,
				}
			})

			await db.buildWeaponOverclock.createMany({
				data: overClocks,
			})
		})

	// map over artifacts and create a buildArtifact for each
	// Object.values(payload.artifacts).forEach(async (a: any) => {
	// 	await db.buildArtifact.create({
	// 		data: {
	// 			buildId,
	// 			artifactId: a.id,
	// 		},
	// 	})}
	// )}

	return { success: 'success', buildId: buildId }
}
