'use client'

import { Artifact, Class, Overclock, Spec, Weapon } from '@/schemas/dataSchemas'
import { FC, useState, useTransition } from 'react'
import Header from './Header'
import WeaponCard from './WeaponCard'
import WeaponSelect from './WeaponSelect'
import { newBuild } from '@/actions/build'
import { useRouter } from 'next/navigation'
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
				artifacts: selectedArtifacts,
			}).then((res) => {
				router.push(`/build/${res.buildId}`)
				router.refresh()
			})
		})
	}

	const handleArtifactSelect = (artifact: Artifact) => {
		if (selectedArtifacts.map((a) => a.id).includes(artifact.id)) {
			setSelectedArtifacts((prev) => prev.filter((a) => a.id !== artifact.id))
		} else {
			setSelectedArtifacts((prev) => [...prev, artifact])
		}
	}

	const handleWeaponSelect = (w: any, index: number) => {
		setSelectedWeapons((prev) => {
			return {
				...prev,
				[index]: { ...w, selectedOverclocks: [] },
			}
		})
	}

	const handleClockSelect = (c: any, index: any) => {
		if (
			selectedWeapons[index]!.selectedOverclocks.map((a: any) => a.id).includes(
				c.id
			)
		) {
			setSelectedWeapons((prev: typeof selectedWeapons) => {
				return {
					...prev,
					[index]: {
						...prev[index],
						selectedOverclocks: prev[index]!.selectedOverclocks.filter(
							(i: Overclock) => i.id !== c.id
						),
					},
				}
			})
		} else {
			setSelectedWeapons((prev: typeof selectedWeapons) => {
				return {
					...prev,
					[index]: {
						...prev[index],
						selectedOverclocks: [...prev[index]!.selectedOverclocks, c],
					},
				}
			})
		}
	}

	const handleWeaponRemove = (index: string) => {
		setSelectedWeapons((prev: typeof selectedWeapons) => {
			return {
				...prev,
				[index]: null,
			}
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
				<div className='flex gap-4 bg-primary/10 p-4 rounded-md flex-col md:flex-row'>
					<div className='flex flex-col gap-4 flex-1 bg-primary/5 p-4 rounded-md'>
						<p className='font-semibold'>Weapons:</p>
						{Object.keys(selectedWeapons).map((key: string) => {
							if (selectedWeapons[key]) {
								return (
									<WeaponCard
										canEdit={true}
										key={key}
										index={key}
										selectedWeapons={selectedWeapons}
										setSelectedWeapons={setSelectedWeapons}
										handleOverclockSelect={handleClockSelect}
										handleWeaponRemove={handleWeaponRemove}
									/>
								)
							} else {
								return (
									<WeaponSelect
										canEdit={true}
										key={key}
										index={key}
										selectedWeapons={selectedWeapons}
										setSelectedWeapons={setSelectedWeapons}
										selectedSpec={selectedSpec}
										handleWeaponSelect={handleWeaponSelect}
									/>
								)
							}
						})}
					</div>
					<div className='flex flex-col gap-4 flex-1 bg-primary/5 p-4 rounded-md'>
						<p className='font-semibold'>Artifacts:</p>
						<ArtifactSelect
							canEdit={true}
							artifacts={artifacts!}
							selectedArtifacts={selectedArtifacts}
							setSelectedArtifacts={setSelectedArtifacts}
							handleArtifactSelect={handleArtifactSelect}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Client
