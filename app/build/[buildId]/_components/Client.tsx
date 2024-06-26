'use client'
import { Artifact, BuildResponse, Overclock, Spec } from '@/schemas/dataSchemas'
import { FC, useState, useTransition } from 'react'
import Header from './Header'
import WeaponCard from '@/app/(protected)/build-planner/_components/WeaponCard'
import WeaponSelect from '@/app/(protected)/build-planner/_components/WeaponSelect'
import ArtifactSelect from '@/app/(protected)/build-planner/_components/ArtifactSelect'
import { updateBuild } from '@/actions/build'
import { toast } from 'sonner'

interface ClientProps {
	build: BuildResponse
	isOwner: boolean
	data: any
	artifacts: any
	isAuthedVisitor: boolean
}

const Client: FC<ClientProps> = ({
	build,
	isOwner,
	data,
	artifacts,
	isAuthedVisitor,
}) => {
	const [buildName, setBuildName] = useState<string>(build.name)
	const [selectedSpec, setSelectedSpec] = useState<Spec>(
		data
			.filter((a: any) => a.id === build.class.id)[0]
			.specs.filter((s: any) => s.id === build.spec.id)[0]
	)
	const [selectedWeapons, setSelectedWeapons] = useState<any>({
		1: { ...build.weapons.filter((w) => w.position === 0)[0] },
		2: build.weapons.filter((w) => w.position === 1)[0] ?? null,
		3: build.weapons.filter((w) => w.position === 2)[0] ?? null,
		4: build.weapons.filter((w) => w.position === 3)[0] ?? null,
	})
	const [selectedArtifacts, setSelectedArtifacts] = useState<Artifact[]>(
		build.artifacts
	)
	const [isPending, startTransition] = useTransition()
	const [modified, setModified] = useState<boolean>(false)

	const handleArtifactSelect = (artifact: Artifact) => {
		if (!isOwner) return
		setModified(true)
		if (selectedArtifacts.map((a) => a.id).includes(artifact.id)) {
			setSelectedArtifacts((prev) => prev.filter((a) => a.id !== artifact.id))
		} else {
			setSelectedArtifacts((prev) => [...prev, artifact])
		}
	}

	const handleWeaponSelect = (w: any, index: number) => {
		setModified(true)
		setSelectedWeapons((prev: any) => {
			return {
				...prev,
				[index]: { ...w, selectedOverclocks: [] },
			}
		})
	}

	const handleWeaponRemove = (index: string) => {
		setModified(true)
		setSelectedWeapons((prev: typeof selectedWeapons) => {
			return {
				...prev,
				[index]: null,
			}
		})
	}

	const handleClockSelect = (c: any, index: any) => {
		if (!isOwner) return
		setModified(true)
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
						selectedOverclocks: prev[index].selectedOverclocks.filter(
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
						selectedOverclocks: [...prev[index].selectedOverclocks, c],
					},
				}
			})
		}
	}

	const handleSave = async () => {
		startTransition(() => {
			updateBuild({
				name: buildName,
				id: build.id,
				weapons: selectedWeapons,
				artifacts: selectedArtifacts,
			}).then((res) => {
				toast.success('Build updated')
				setModified(false)
			})
		})
	}

	return (
		<div className='parent'>
			<div className='gutters py-4 space-y-4'>
				<Header
					buildName={buildName}
					setBuildName={setBuildName}
					setModified={setModified}
					modified={modified}
					selectedSpec={selectedSpec}
					build={build}
					isOwner={isOwner}
					handleSave={handleSave}
					isSavePending={isPending}
					isAuthedVisitor={isAuthedVisitor}
				/>
				<div className='flex gap-4 bg-primary/10 p-4 rounded-md flex-col xl:flex-row'>
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
										canEdit={isOwner}
										handleOverclockSelect={handleClockSelect}
										handleWeaponRemove={handleWeaponRemove}
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
										canEdit={isOwner}
										handleWeaponSelect={handleWeaponSelect}
									/>
								)
							}
						})}
					</div>

					<div className='flex flex-col gap-4 flex-1 bg-primary/5 p-4 rounded-md'>
						<p className='font-semibold'>Artifacts:</p>
						<ArtifactSelect
							canEdit={isOwner}
							artifacts={artifacts}
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
