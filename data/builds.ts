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
				class: true,
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

export const getBuildById = async (id: string) => {
	try {
		const build = await db.build.findUnique({
			where: {
				id,
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
		return build
	} catch (e) {
		console.log(e)
		return null
	}
}
