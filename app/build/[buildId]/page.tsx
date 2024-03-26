import { getBuildById } from '@/data/builds'
import { FC } from 'react'
import { auth } from '@/auth'
import { getClassesSpecsAndWeapons } from '@/data/class'
import { getArtifacts } from '@/data/artifacts'
import Client from './_components/Client'
import { getWeaponsBySpec } from '@/data/weapons'

interface pageProps {
	params: {
		buildId: string
	}
}

const dynamic = 'force-dynamic'

const page: FC<pageProps> = async ({ params }) => {
	const build = await getBuildById(params.buildId)
	const session = await auth()
	const isOwner = session?.user?.id === build?.userId
	const data = await getClassesSpecsAndWeapons()
	const artifacts = await getArtifacts()
	const weapons = await getWeaponsBySpec(build?.specId!)

	if (!build) {
		return <div>Build not found</div>
	}

	return (
		<Client
			build={build}
			isOwner={isOwner}
			data={data}
			artifacts={artifacts}
			weapons={weapons[0].weapons}
		/>
	)
}

export default page
