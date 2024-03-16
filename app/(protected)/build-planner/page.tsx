import { getClassesSpecsAndWeapons } from '@/data/class'
import { FC } from 'react'
import Client from './_components/Client'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const data = await getClassesSpecsAndWeapons()

	return <Client data={data} />
}

export default page
