import { db } from '@/lib/db'

export const getArtifacts = async () => {
	try {
		const artifacts = await db.artifact.findMany()
		return artifacts
	} catch (e) {
		console.log(e)
		return null
	}
}
