'use client'
import { FC, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import BuildTile from './BuildTile'
import { metaBuild } from '@/schemas/dataSchemas'
import ClassSelector from './ClassSelector'
import { useBuilds } from '@/hooks/useBuilds'
import Link from 'next/link'

const classNames = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

interface pageProps {
	classes: {
		id: number
		name: (typeof classNames)[number]
		description: string
		image: string
	}[]
	builds: metaBuild[]
}

const page: FC<pageProps> = ({ classes, builds }) => {
	const [search, setSearch] = useState<string>('')
	const {
		popularFilteredBuilds,
		filteredBuilds,
		selectedClass,
		setSelectedClass,
	} = useBuilds(search, classNames, builds)

	return (
		<div className='parent'>
			<div className='gutters py-4 space-y-4'>
				<div className='flex justify-between'>
					<h1 className='font-semibold text-xl'>DRGS Meta Builds</h1>
					<div className='p-2 flex gap-2 items-center w-[250px] bg-primary/10 group rounded-md'>
						<HiMagnifyingGlass className='h-5 w-5' />
						<Input
							type='text'
							placeholder='Search by build or weapon...'
							className='w-full bg-transparent group-focus-within:ring-0 group-focus-within:outline-none text-primary p-0 h-fit border-0 focus-visible:ring-0 input-reset'
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
				</div>

				<div className='flex gap-8'>
					<div className='flex basis-[35%] items-start'>
						<ClassSelector
							classes={classes}
							setSelectedClass={setSelectedClass}
							selectedClass={selectedClass}
						/>
					</div>

					<div className='flex flex-col basis-[65%] text-primary/75 min-w-[600px]'>
						<div className='flex flex-col gap-4 pb-4'>
							<h2 className='p-2 bg-primary/20 rounded-md'>Popular Builds</h2>
							{popularFilteredBuilds.map((item) => (
								<Link href={`/build/${item.build.id}`} key={item.id}>
									<BuildTile item={item} />
								</Link>
							))}
						</div>
						<div className='flex flex-col gap-4'>
							<h2 className='p-2 bg-primary/20 rounded-md'>Other Builds</h2>
							{filteredBuilds.map((item) => (
								<Link href={`/build/${item.build.id}`} key={item.id}>
									<BuildTile item={item} />
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
