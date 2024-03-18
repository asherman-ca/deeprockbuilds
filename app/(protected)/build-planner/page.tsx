import { getClassesSpecsAndWeapons } from '@/data/class'
import { FC } from 'react'
import Client from './_components/Client'
import { getArtifacts } from '@/data/artifacts'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const data = await getClassesSpecsAndWeapons()
	const artifacts = await getArtifacts()

	return <Client data={data} artifacts={artifacts} />
}

export default page
