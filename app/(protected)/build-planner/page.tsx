import { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
	return (
		<div className='parent'>
			<div className='gutters'>page</div>
		</div>
	)
}

export default page
