import { getBuildById } from '@/data/builds'
import { FC } from 'react'

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

	return (
		<div className='parent'>
			<div className='gutters py-4'>{build!.name}</div>
		</div>
	)
}

export default page
