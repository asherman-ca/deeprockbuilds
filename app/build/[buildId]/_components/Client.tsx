'use client'
import { selectedWeaponsType } from '@/app/(protected)/build-planner/_components/Client'
import { Artifact, BuildResponse, Spec } from '@/schemas/dataSchemas'
import { FC, useState, useTransition } from 'react'
import Header from './Header'
import WeaponCard from '@/app/(protected)/build-planner/_components/WeaponCard'
import WeaponSelect from '@/app/(protected)/build-planner/_components/WeaponSelect'

interface ClientProps {
	build: BuildResponse
	isOwner: boolean
	data: any
	artifacts: any
	weapons: any
}

const Client: FC<ClientProps> = ({
	build,
	isOwner,
	data,
	artifacts,
	weapons,
}) => {
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
			overclocks: weapons.filter((weapon: any) => weapon.id === w.weapon.id)[0]
				.overclocks,
		}
	})

	const [buildName, setBuildName] = useState<string>(build.name)
	const [selectedSpec, setSelectedSpec] = useState<Spec>(
		data[0].specs.filter((s: any) => s.id === build.spec.id)[0]
	)
	const [selectedWeapons, setSelectedWeapons] = useState<any>({
		1: { ...build.weapons.filter((w) => w.position === 0)[0] },
		2: build.weapons.filter((w) => w.position === 1)[0] ?? null,
		3: build.weapons.filter((w) => w.position === 2)[0] ?? null,
		4: build.weapons.filter((w) => w.position === 3)[0] ?? null,
	})
	const [selectedArtifacts, setSelectedArtifacts] = useState<Artifact[]>([])
	const [isPending, startTransition] = useTransition()
	const [modified, setModified] = useState<boolean>(false)

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
					</div>
				</div>
			</div>
		</div>
	)
}

export default Client
