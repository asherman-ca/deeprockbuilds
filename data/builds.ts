import { db } from '@/lib/db'

export const getMetaBuilds = async () => {
	try {
		const builds = await db.metaBuild.findMany({
			include: {
				class: true,
				build: {
					include: {
						spec: true,
						weapons: {
							include: {
								weapon: true,
								overclocks: {
									include: {
										overclock: true,
									},
								},
							},
						},
					},
				},
			},
		})
		console.log('builds', builds)
		return builds
	} catch (e) {
		console.log(e)
		return null
	}
}

export const getUserBuilds = async (userId: string) => {
	try {
		const builds = await db.build.findMany({
			where: {
				userId,
			},
			include: {
				spec: true,
				weapons: {
					include: {
						weapon: true,
						overclocks: {
							include: {
								overclock: true,
							},
						},
					},
				},
			},
		})
		return builds
	} catch (e) {
		console.log(e)
		return null
	}
}
