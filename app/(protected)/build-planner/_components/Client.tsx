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
			<div className='gutters py-4 space-y-4'>
				<Header
					selectedSpec={selectedSpec}
					setSpec={setSelectedSpec}
					classes={data}
				/>
				<div className='flex flex-col gap-2'>
					{Object.keys(selectedWeapons).map((key: string) => {
						return (
							<div className='flex gap-2 items-center'>
								{selectedWeapons[key] ? (
									<Button>'Change'</Button>
								) : (
									<Button
										variant='ghost'
										className='h-10 w-10 border-primary border rounded-md'
									/>
								)}
								<div>
									<p>Weapon {key}</p>
									<p>{selectedWeapons[key] ? 'selected' : 'Empty'}</p>
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
