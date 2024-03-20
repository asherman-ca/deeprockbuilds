import { getBuildById } from '@/data/builds'
import { FC } from 'react'
import Client from './_components/Client'

interface pageProps {
	params: {
		buildId: string
	}
}

const page: FC<pageProps> = async ({ params }) => {
	const build = await getBuildById(params.buildId)

	if (!build) {
		return <div>Build not found</div>
	}

	return <Client build={build} />
}

export default page
