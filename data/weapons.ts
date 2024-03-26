import { db } from '@/lib/db'

export const getWeaponsBySpec = async (specId: string): Promise<any> => {
	try {
		const weapons = await db.spec.findMany({
			where: {
				id: specId,
			},
			select: {
				weapons: {
					include: {
						overclocks: true,
					},
				},
			},
		})
		return weapons
	} catch (error) {
		return null
	}
}
