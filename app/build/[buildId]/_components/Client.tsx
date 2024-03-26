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
				<div className='flex gap-4 bg-primary/10 p-4 rounded-md'>
					<div className='flex flex-col gap-4 flex-1 bg-primary/5 p-4 rounded-md'>
						<p className='font-semibold'>Weapons:</p>
						{selectedSpec.name}
						{selectedWeapons[1]?.weapon.name}
						{selectedWeapons[2]?.weapon.name}
						{selectedWeapons[3]?.weapon.name}
					</div>

					<div className='flex flex-col gap-4 flex-1 bg-primary/5 p-4 rounded-md'>
						<p className='font-semibold'>Artifacts:</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Client
