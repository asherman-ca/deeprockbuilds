'use client'

import { Artifact, Class, Overclock, Spec, Weapon } from '@/schemas/dataSchemas'
import { FC, useState, useTransition } from 'react'
import Header from './Header'
import WeaponCard from './WeaponCard'
import WeaponSelect from './WeaponSelect'
import { newBuild } from '@/actions/build'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ArtifactSelect from './ArtifactSelect'

interface ClientProps {
	data: Class[] | null | any
	artifacts: Artifact[] | null
}

export type selectedWeaponType =
	| (Weapon & { selectedOverclocks: Overclock[] })
	| null

export type selectedWeaponsType = {
	[key: string]: selectedWeaponType
}

const Client: FC<ClientProps> = ({ data, artifacts }) => {
	const router = useRouter()
	const [buildName, setBuildName] = useState<string>('')
	const [selectedSpec, setSelectedSpec] = useState<Spec>(data![0].specs[0])
	const [selectedWeapons, setSelectedWeapons] = useState<selectedWeaponsType>({
		1: { ...selectedSpec.primaryWeapon, selectedOverclocks: [] },
		2: null,
		3: null,
		4: null,
	})
	const [selectedArtifacts, setSelectedArtifacts] = useState<Artifact[]>([])

	const [isPending, startTransition] = useTransition()

	const onSubmit = () => {
		startTransition(() => {
			newBuild({
				name: buildName,
				description: 'test description',
				spec: selectedSpec,
				weapons: selectedWeapons,
			}).then((res) => {
				console.log(res)
				router.push(`/builds/${res.buildId}`)
			})
		})
	}

	return (
		<div className='parent'>
			<div className='gutters py-4 space-y-4'>
				<Header
					selectedSpec={selectedSpec}
					setSpec={setSelectedSpec}
					setWeapons={setSelectedWeapons}
					classes={data}
					onSubmit={onSubmit}
					setBuildName={setBuildName}
					buildName={buildName}
					isPending={isPending}
				/>
				<div className='flex gap-4 bg-primary/10 p-4 rounded-md'>
					<div className='flex flex-col gap-4 flex-1 bg-primary/5 p-4 rounded-md'>
						<p className='font-semibold'>Weapons:</p>
						{Object.keys(selectedWeapons).map((key: string) => {
							if (selectedWeapons[key]) {
								return (
									<WeaponCard
										key={key}
										index={key}
										selectedWeapons={selectedWeapons}
										setSelectedWeapons={setSelectedWeapons}
									/>
								)
							} else {
								return (
									<WeaponSelect
										key={key}
										index={key}
										selectedWeapons={selectedWeapons}
										setSelectedWeapons={setSelectedWeapons}
										selectedSpec={selectedSpec}
									/>
								)
							}
						})}
					</div>
					<div className='flex flex-col gap-4 flex-1 bg-primary/5 p-4 rounded-md'>
						<p className='font-semibold'>Artifacts:</p>
						<ArtifactSelect
							artifacts={artifacts!}
							selectedArtifacts={selectedArtifacts}
							setSelectedArtifacts={setSelectedArtifacts}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Client
