import React from 'react'
import MetaBuildClient from '@/components/MetaBuildClient'
import { getClasses } from '@/data/class'
import { getMetaBuilds } from '@/data/builds'

const page = async () => {
	const classes = (await getClasses()) as any
	console.log('cls', classes)
	const builds = (await getMetaBuilds()) as any

	return <MetaBuildClient classes={classes} builds={builds} />
}

export default page

// {"Damage": "60*7 Bullets",
// "Fire Rate": "2/s",
// "Clip Size": "2",
// "Reload Time": "4s",
// "DPS": "24-168"}
