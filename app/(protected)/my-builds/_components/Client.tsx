'use client'
import BuildTile from '@/components/BuildTile'
import ClassSelector from '@/components/ClassSelector'
import { Input } from '@/components/ui/input'
import { useUserBuilds } from '@/hooks/useUserBuilds'
import { Build } from '@/schemas/dataSchemas'
import { FC, useState } from 'react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const classNames = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

interface ClientProps {
	builds: Build[]
	classes: {
		id: number
		name: (typeof classNames)[number]
		description: string
		image: string
	}[]
}

const Client: FC<ClientProps> = ({ builds, classes }) => {
	const [search, setSearch] = useState<string>('')
	const { filteredBuilds, selectedClass, setSelectedClass } = useUserBuilds(
		search,
		classNames,
		builds
	)
	return (
		<div className='parent flex-1'>
			<div className='gutters py-4 space-y-4'>
				<div className='flex justify-between'>
					<h1 className='font-semibold text-xl'>My Builds</h1>
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
					<div className='flex flex-col basis-[65%] text-primary/75 min-w-[600px] gap-4'>
						<h2>All {selectedClass} Builds</h2>
						{filteredBuilds.map((item) => (
							<BuildTile
								key={item.id}
								item={{
									id: item.id,
									class: item.class,
									build: item,
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Client
