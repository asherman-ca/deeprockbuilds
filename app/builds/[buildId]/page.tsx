import { getBuildById } from '@/data/builds'
import { FC } from 'react'
import Client from './_components/Client'
import { auth } from '@/auth'

interface pageProps {
	params: {
		buildId: string
	}
}

const page: FC<pageProps> = async ({ params }) => {
	const build = await getBuildById(params.buildId)
	const session = await auth()
	const isOwner = session?.user?.id === build?.userId

	if (!build) {
		return <div>Build not found</div>
	}

	return <Client build={build} isOwner={isOwner} />
}

export default page
