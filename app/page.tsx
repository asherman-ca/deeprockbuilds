import React from 'react'
import MetaBuildClient from '@/components/MetaBuildClient'
import { getClasses } from '@/data/class'
import { getMetaBuilds } from '@/data/builds'

const page = async () => {
	const classes = (await getClasses()) as any
	const builds = (await getMetaBuilds()) as any

	return <MetaBuildClient classes={classes} builds={builds} />
}

export default page
