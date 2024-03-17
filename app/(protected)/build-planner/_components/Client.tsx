'use client'
import { Class, Spec, Weapon } from '@/schemas/dataSchemas'
import { FC, useEffect, useState } from 'react'
import Header from './Header'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ClientProps {
	data: Class[] | null | any
}

type selectedWeaponType = {
	[key: string]: any
}

const Client: FC<ClientProps> = ({ data }) => {
	const [selectedSpec, setSelectedSpec] = useState<Spec>(data![0].specs[0])
	const [selectedWeapons, setSelectedWeapons] = useState<selectedWeaponType>({
		1: { ...selectedSpec.primaryWeapon, selectedOverclocks: [] },
		2: null,
		3: null,
		4: null,
	})

	console.log(selectedWeapons)

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
								<div className='flex flex-col gap-4' key={key}>
									<div className='flex gap-4 items-center'>
										<Image
											className='h-16 w-16 border-[#DA8200] border rounded-md p-1'
											src={selectedWeapons[key].image}
											height={50}
											width={50}
											alt='weapon-image'
										/>
										<div className='flex flex-col'>
											<p className='text-primary/75'>Weapon {key}</p>
											<p>
												{selectedWeapons[key]
													? selectedWeapons[key].name
													: 'Empty'}
											</p>
										</div>
									</div>
									<div className='flex gap-2'>
										{selectedWeapons[key].overclocks.map((c: any) => (
											<Button
												className={cn(
													'p-1 border-primary rounded-md border cursor-pointer bg-transparent',
													{
														'border-[#DA8200]':
															selectedWeapons[key].selectedOverclocks.includes(
																c
															),
													}
												)}
												disabled={
													selectedWeapons[key].selectedOverclocks.length >= 3 &&
													!selectedWeapons[key].selectedOverclocks.includes(c)
												}
												onClick={() => {
													if (
														selectedWeapons[key].selectedOverclocks.includes(c)
													) {
														setSelectedWeapons((prev) => {
															return {
																...prev,
																[key]: {
																	...prev[key],
																	selectedOverclocks: prev[
																		key
																	].selectedOverclocks.filter(
																		(i: any) => i !== c
																	),
																},
															}
														})
													} else {
														setSelectedWeapons((prev) => {
															return {
																...prev,
																[key]: {
																	...prev[key],
																	selectedOverclocks: [
																		...prev[key].selectedOverclocks,
																		c,
																	],
																},
															}
														})
													}
												}}
											>
												<Image
													src={c.image}
													alt='overclock image'
													height={40}
													width={40}
													className='p-1'
												/>
											</Button>
										))}
									</div>
								</div>
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
												? selectedWeapons[key].name
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
