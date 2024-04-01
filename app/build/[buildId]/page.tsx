import { getBuildById } from '@/data/builds'
import { FC } from 'react'
import { auth } from '@/auth'
import { getClassesSpecsAndWeapons } from '@/data/class'
import { getArtifacts } from '@/data/artifacts'
import Client from './_components/Client'
import { getWeaponsBySpec } from '@/data/weapons'

export const revalidate = 0

interface pageProps {
	params: {
		buildId: string
	}
}

const page: FC<pageProps> = async ({ params }) => {
	const build = await getBuildById(params.buildId)
	const session = await auth()
	const isOwner = session?.user?.id === build?.userId
	const isAuthedVisitor = session?.user && !isOwner ? true : false
	const data = await getClassesSpecsAndWeapons()
	const artifacts = await getArtifacts()
	const weapons = await getWeaponsBySpec(build?.specId!)

	if (!build) {
		return <div>Build not found</div>
	}

	build.weapons = build.weapons.map((w) => {
		return {
			...w,
			...w.weapon,
			selectedOverclocks: w.overclocks.map((o) => o.overclock),
		}
	}) as any

	build.weapons = build.weapons.map((w) => {
		return {
			...w,
			overclocks: weapons[0].weapons.filter(
				(weapon: any) => weapon.id === w.weapon.id
			)[0].overclocks,
		}
	})

	return (
		<Client
			build={build}
			isOwner={isOwner}
			data={data}
			artifacts={artifacts}
			isAuthedVisitor={isAuthedVisitor}
		/>
	)
}

export default page
