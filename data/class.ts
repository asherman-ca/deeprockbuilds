import { db } from '@/lib/db'

export const getClassesSpecsAndWeapons = async () => {
	try {
		const classes = await db.class.findMany({
			include: {
				specs: {
					include: {
						weapons: true,
					},
				},
			},
		})
		return classes
	} catch (e) {
		console.log(e)
		return null
	}
}
