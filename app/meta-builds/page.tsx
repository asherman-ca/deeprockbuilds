import React from 'react'
import Client from '@/app/meta-builds/_components/client'
import { getClasses } from '@/data/class'

const page = async () => {
	const classes = (await getClasses()) as any

	return <Client classes={classes} />
}

export default page
