import { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	return (
		<div className='parent'>
			<div className='gutters py-4'>
				<div>
					<h1 className='text-xl font-semibold'>DRGS Meta Builds</h1>
				</div>
			</div>
		</div>
	)
}

export default page
