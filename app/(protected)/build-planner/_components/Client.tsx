'use client'
import { Class, Spec } from '@/schemas/dataSchemas'
import { FC, useEffect, useState } from 'react'
import Header from './Header'
import { Button } from '@/components/ui/button'

interface ClientProps {
	data: Class[] | null | any
}

type selectedWeaponType = {
	[key: string]: any
}

const Client: FC<ClientProps> = ({ data }) => {
	const [selectedSpec, setSelectedSpec] = useState<Spec>(data![0].specs[0])
	const [selectedWeapons, setSelectedWeapons] = useState<selectedWeaponType>({
		1: null,
		2: null,
		3: null,
		4: null,
	})

	return (
		<div className='parent'>
			<div className='gutters py-4 space-y-8'>
				<Header
					selectedSpec={selectedSpec}
					setSpec={setSelectedSpec}
					classes={data}
				/>
				<div className='flex flex-col gap-4'>
					{Object.keys(selectedWeapons).map((key: string) => {
						return (
							<div className='flex gap-2 items-center'>
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
										{selectedWeapons[key] ? selectedWeapons[key].name : 'Empty'}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}

export default Client
