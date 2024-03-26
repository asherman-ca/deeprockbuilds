'use client'
import { selectedWeaponsType } from '@/app/(protected)/build-planner/_components/Client'
import { Artifact, BuildResponse, Spec } from '@/schemas/dataSchemas'
import { FC, useState, useTransition } from 'react'
import Header from './Header'

interface ClientProps {
	build: BuildResponse
	isOwner: boolean
	data: any
	artifacts: any
}

const Client: FC<ClientProps> = ({ build, isOwner, data, artifacts }) => {
	const [buildName, setBuildName] = useState<string>(build.name)
	const [selectedSpec, setSelectedSpec] = useState<Spec>(build.spec)
	const [selectedWeapons, setSelectedWeapons] = useState<any>({
		1: build.weapons.filter((w) => w.position === 1)[0],
		2: build.weapons.filter((w) => w.position === 2)[0] ?? null,
		3: build.weapons.filter((w) => w.position === 3)[0] ?? null,
		4: build.weapons.filter((w) => w.position === 4)[0] ?? null,
	})
	const [selectedArtifacts, setSelectedArtifacts] = useState<Artifact[]>([])
	const [isPending, startTransition] = useTransition()
	const [modified, setModified] = useState<boolean>(false)

	console.log('build', build)

	return (
		<div className='parent'>
			<div className='gutters py-4 space-y-4'>
				<Header
					buildName={buildName}
					setBuildName={setBuildName}
					setModified={setModified}
					modified={modified}
					isPending={isPending}
					selectedSpec={selectedSpec}
					build={build}
					isOwner={isOwner}
				/>
				{selectedSpec.name}
				{selectedWeapons[1]?.weapon.name}
				{selectedWeapons[2]?.weapon.name}
				{selectedWeapons[3]?.weapon.name}
			</div>
		</div>
	)
}

export default Client
