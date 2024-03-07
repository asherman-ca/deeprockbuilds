import { getClassesSpecsAndWeapons } from '@/data/class'
import { FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const data = await getClassesSpecsAndWeapons()

	return (
		<div className='parent'>
			<div className='gutters'></div>
		</div>
	)
}

export default page
