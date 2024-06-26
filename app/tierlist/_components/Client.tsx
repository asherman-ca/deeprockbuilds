'use client'
import ClassSelector from '@/components/ClassSelector'
import { useUserBuilds } from '@/hooks/useUserBuilds'
import { cn } from '@/lib/utils'
import { metaBuild } from '@/schemas/dataSchemas'
import Image from 'next/image'
import { FC } from 'react'

const classNames = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

const indexToTierMap: { [index: string]: { tier: string; color: string } } = {
	0: { tier: 'S', color: 'bg-red-800/90' },
	1: { tier: 'A', color: 'bg-orange-800/90' },
	2: { tier: 'B', color: 'bg-yellow-800/90' },
	3: { tier: 'C', color: 'bg-green-800/90' },
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
	const { filteredBuilds, selectedClass, setSelectedClass } = useUserBuilds(
		'',
		classNames,
		builds
	)

	// @ts-ignore
	// const groupedBuilds = Object.groupBy(
	// 	filteredBuilds,
	// 	({ position }: { position: string }) => position
	// )

	const groupedBuilds: { [key: string]: metaBuild[] } = filteredBuilds.reduce(
		(groups, build: any) => {
			const key = build.position
			if (!groups[key]) {
				groups[key] = []
			}
			groups[key].push(build)
			return groups
		},
		{} as { [key: string]: metaBuild[] }
	)

	return (
		<div className='parent flex-1'>
			<div className='gutters flex py-4 gap-4 lg:flex-row flex-col'>
				<div className='flex basis-[35%] items-start'>
					<ClassSelector
						classes={classes}
						setSelectedClass={setSelectedClass}
						selectedClass={selectedClass}
					/>
				</div>

				<div className='flex flex-col basis-[65%]'>
					<div className='bg-primary/10 rounded-md'>
						{Object.keys(indexToTierMap).map((index: string) => (
							<div className='flex'>
								<p
									className={cn(
										`flex items-center px-8 ${indexToTierMap[index].color} text-xl font-semibold text-black w-[75px] h-[75px]`,
										{
											'rounded-tl-md': index === '0',
											'rounded-bl-md': index === '3',
										}
									)}
								>
									{indexToTierMap[index].tier}
								</p>
								<div className='grid grid-cols-3 p-2 gap-2 flex-1'>
									{groupedBuilds[index]?.map((item) => (
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
											<div className='text-ellipsis overflow-hidden'>
												{item.build.name}
											</div>
										</a>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Client
