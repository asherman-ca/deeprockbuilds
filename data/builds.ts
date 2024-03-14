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
