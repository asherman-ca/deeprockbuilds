'use client'
import ClassSelector from '@/components/ClassSelector'
import { useUserBuilds } from '@/hooks/useUserBuilds'
import { cn } from '@/lib/utils'
import { metaBuild } from '@/schemas/dataSchemas'
import Image from 'next/image'
import { FC, useState } from 'react'

const classNames = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

const indexToTierMap: { [index: string]: { tier: string; color: string } } = {
	0: { tier: 'S', color: 'bg-red-500' },
	1: { tier: 'A', color: 'bg-orange-500' },
	2: { tier: 'B', color: 'bg-yellow-500' },
	3: { tier: 'C', color: 'bg-green-500' },
}

interface ClientProps {
	classes: {
		id: number
		name: (typeof classNames)[number]
		description: string
		image: string
	}[]
	builds: any
}

const Client: FC<ClientProps> = ({ classes, builds }) => {
	const [search, setSearch] = useState<string>('')
	const { filteredBuilds, selectedClass, setSelectedClass } = useUserBuilds(
		search,
		classNames,
		builds
	)
	// groupBy is very new JS method and does not exist on Object type
	// @ts-expect-error
	const groupedBuilds = Object.groupBy(
		filteredBuilds,
		({ position }: { position: string }) => position
	)

	return (
		<div className='parent flex-1'>
			<div className='gutters flex py-4 gap-4'>
				<div className='flex basis-[35%] items-start'>
					<ClassSelector
						classes={classes}
						setSelectedClass={setSelectedClass}
						selectedClass={selectedClass}
					/>
				</div>

				<div className='flex flex-col basis-[65%]'>
					<div className='bg-primary/10 rounded-md'>
						{Object.keys(groupedBuilds).map((index: string) => (
							<div className='flex'>
								<div
									className={cn(
										`flex items-center px-8 ${indexToTierMap[index].color}`,
										{
											'rounded-tl-md': index === '0',
											'rounded-bl-md': index === '3',
										}
									)}
								>
									{indexToTierMap[index].tier}
								</div>
								<div className='grid grid-cols-3 p-2 gap-4 flex-1'>
									{groupedBuilds[index].map((item: metaBuild) => (
										<a
											href={`/build/${item.build.id}`}
											key={item.build.id}
											className='p-2 flex items-center gap-2 cursor-pointer bg-primary/10 rounded-md'
										>
											<Image
												className='h-10 w-10 bg-primary/10 p-1 rounded-md'
												src={item.build.spec.image}
												alt='class-image'
												height={50}
												width={50}
											/>
											<div>{item.build.name}</div>
										</a>
									))}
								</div>
							</div>
						))}
					</div>
					{/* <div>S Tier</div>

					<div>A Tier</div>

					<div>B Tier</div>

					<div>C Tier</div> */}
				</div>
			</div>
		</div>
	)
}

export default Client
