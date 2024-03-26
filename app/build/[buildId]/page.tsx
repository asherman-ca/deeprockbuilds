import { getBuildById } from '@/data/builds'
import { FC } from 'react'
import { auth } from '@/auth'
import { getClassesSpecsAndWeapons } from '@/data/class'
import { getArtifacts } from '@/data/artifacts'
import Client from './_components/Client'

interface pageProps {
	params: {
		buildId: string
	}
}

const page: FC<pageProps> = async ({ params }) => {
	const build = await getBuildById(params.buildId)
	const session = await auth()
	const isOwner = session?.user?.id === build?.userId
	const data = await getClassesSpecsAndWeapons()
	const artifacts = await getArtifacts()

	if (!build) {
		return <div>Build not found</div>
	}

	return (
		<Client build={build} isOwner={isOwner} data={data} artifacts={artifacts} />
	)
}

export default page
