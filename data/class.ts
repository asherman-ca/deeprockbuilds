import { db } from '@/lib/db'
import { ClassesSpecsAndWeapons } from '@/schemas/dataSchemas'

export const getClassesSpecsAndWeapons =
	async (): Promise<ClassesSpecsAndWeapons | null> => {
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

export const getClasses = async () => {
	try {
		const classes = await db.class.findMany()
		return classes
	} catch (e) {
		console.log(e)
		return null
	}
}
