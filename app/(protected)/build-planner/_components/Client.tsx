'use client'

import { Class, Overclock, Spec, Weapon } from '@/schemas/dataSchemas'
import { FC, useState, useTransition } from 'react'
import Header from './Header'
import WeaponCard from './WeaponCard'
import WeaponSelect from './WeaponSelect'
import { newBuild } from '@/actions/build'

interface ClientProps {
	data: Class[] | null | any
}

export type selectedWeaponType =
	| (Weapon & { selectedOverclocks: Overclock[] })
	| null

export type selectedWeaponsType = {
	[key: string]: selectedWeaponType
}

const Client: FC<ClientProps> = ({ data }) => {
	const [selectedSpec, setSelectedSpec] = useState<Spec>(data![0].specs[0])
	const [selectedWeapons, setSelectedWeapons] = useState<selectedWeaponsType>({
		1: { ...selectedSpec.primaryWeapon, selectedOverclocks: [] },
		2: null,
		3: null,
		4: null,
	})

	const [isPending, startTransition] = useTransition()

	const onSubmit = () => {
		startTransition(() => {
			newBuild({
				name: 'test name',
				description: 'test description',
				spec: selectedSpec,
				weapons: selectedWeapons,
			}).then((res) => {
				console.log(res)
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
				/>
				<div className='flex flex-col gap-4 bg-primary/10 p-4 rounded-md'>
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
			</div>
		</div>
	)
}

export default Client
