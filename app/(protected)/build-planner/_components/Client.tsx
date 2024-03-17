'use client'
import { Class, Overclock, Spec, Weapon } from '@/schemas/dataSchemas'
import { FC, useState } from 'react'
import Header from './Header'
import { Button } from '@/components/ui/button'
import WeaponCard from './WeaponCard'

interface ClientProps {
	data: Class[] | null | any
}

type selectedWeaponType = {
	[key: string]: (Weapon & { selectedOverclocks: Overclock[] }) | null
}

const Client: FC<ClientProps> = ({ data }) => {
	const [selectedSpec, setSelectedSpec] = useState<Spec>(data![0].specs[0])
	const [selectedWeapons, setSelectedWeapons] = useState<selectedWeaponType>({
		1: { ...selectedSpec.primaryWeapon, selectedOverclocks: [] },
		2: null,
		3: null,
		4: null,
	})

	return (
		<div className='parent'>
			<div className='gutters py-4 space-y-4'>
				<Header
					selectedSpec={selectedSpec}
					setSpec={setSelectedSpec}
					classes={data}
					setWeapons={setSelectedWeapons}
				/>
				<div className='flex flex-col gap-4 bg-primary/10 p-4 rounded-md'>
					{Object.keys(selectedWeapons).map((key: string) => {
						if (key === '1') {
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
								<div className='flex gap-4 items-center' key={key}>
									{selectedWeapons[key] ? (
										<Button>'Change'</Button>
									) : (
										<Button
											variant='ghost'
											className='h-16 w-16 border-primary border rounded-md'
										/>
									)}
									<div className='flex flex-col'>
										<p className='text-primary/75'>Weapon {key}</p>
										<p>
											{selectedWeapons[key]
												? selectedWeapons[key]!.name
												: 'Empty'}
										</p>
									</div>
								</div>
							)
						}
					})}
				</div>
			</div>
		</div>
	)
}

export default Client
