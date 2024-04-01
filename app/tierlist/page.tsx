import { FC } from 'react'
import Client from './_components/Client'
import { getClasses } from '@/data/class'
import { getMetaBuilds } from '@/data/builds'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const classes = (await getClasses()) as any
	const builds = (await getMetaBuilds()) as any

	return <Client classes={classes} builds={builds} />
}

export default page
