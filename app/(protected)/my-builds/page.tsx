import { FC } from 'react'
import { auth } from '@/auth'
import { getUserBuilds } from '@/data/builds'
import { getClasses } from '@/data/class'
import Client from './_components/Client'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const user = (await auth()) as any
	const classes = (await getClasses()) as any
	const builds = await getUserBuilds(user.user.id)

	return <Client builds={builds} />
}

export default page
