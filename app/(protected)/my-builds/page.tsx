import { FC } from 'react'
import { auth } from '@/auth'
import { getUserBuilds } from '@/data/builds'
import { getClasses } from '@/data/class'
import Client from './_components/Client'
import { Build } from '@/schemas/dataSchemas'

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
	const user = (await auth()) as any
	const classes = (await getClasses()) as any
	const builds = (await getUserBuilds(user.user.id)) as unknown as Build[]

	return <Client builds={builds} classes={classes} />
}

export default page
