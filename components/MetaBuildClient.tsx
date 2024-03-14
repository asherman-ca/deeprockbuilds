'use client'
import { FC, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { HiMagnifyingGlass } from 'react-icons/hi2'

const classNames = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

interface pageProps {
	classes: {
		id: number
		name: (typeof classNames)[number]
		description: string
		image: string
	}[]
	builds: any[]
}

const page: FC<pageProps> = ({ classes, builds }) => {
	const [selectedClass, setSelectedClass] = useState<
		(typeof classNames)[number] | ''
	>('')
	console.log(builds)
	const [filteredBuilds, setFilteredBuilds] = useState(
		builds.filter((item) => !item.popular)
	)
	const [popularFilteredBuilds, setPopularFilteredBuilds] = useState(
		builds.filter((item) => item.popular)
	)

	useEffect(() => {
		if (selectedClass === '') {
			setFilteredBuilds(builds.filter((item) => !item.popular))
			setPopularFilteredBuilds(builds.filter((item) => item.popular))
		} else {
			setFilteredBuilds(
				builds.filter(
					(item) => item.class.name === selectedClass && !item.popular
				)
			)
			setPopularFilteredBuilds(
				builds.filter(
					(item) => item.class.name === selectedClass && item.popular
				)
			)
		}
	}, [selectedClass])

	return (
		<div className='parent'>
			<div className='gutters py-4 space-y-4'>
				<div className='flex justify-between'>
					<h1 className='font-semibold text-xl'>DRGS Meta Builds</h1>
					<div className='p-2 flex gap-2 items-center w-[250px] bg-primary/10 group rounded-md'>
						<HiMagnifyingGlass className='h-5 w-5' />
						<Input
							type='text'
							placeholder='Search by build or skill...'
							className='w-full bg-transparent group-focus-within:ring-0 group-focus-within:outline-none text-primary p-0 h-fit'
						/>
					</div>
				</div>

				<div className='flex gap-8'>
					<div className='flex basis-[35%]'>
						<div className='flex flex-col bg-primary-foreground w-full rounded-md'>
							{classes.map((item, idx) => (
								<div
									key={item.id}
									className={cn(
										'p-4 border-primary/20 flex items-center gap-2 cursor-pointer group text-primary/75 transition-all',
										{
											'border-b': idx !== classes.length - 1,
											'bg-primary/10': selectedClass === item.name,
										}
									)}
									onClick={() => {
										if (selectedClass === item.name) {
											setSelectedClass('')
										} else {
											setSelectedClass(item.name)
										}
									}}
								>
									<Image
										className='rounded-md h-10 w-10 bg-primary/10 p-1'
										src={item.image}
										alt={item.name}
										width={25}
										height={25}
									/>
									<p
										className={cn('', {
											'group-hover:text-primary/100':
												selectedClass !== item.name,
											'text-primary/100': selectedClass === item.name,
										})}
									>
										{item.name}
									</p>
									<span
										className={cn(
											'h-5 w-5 bg-primary/10 ml-auto transition-all',
											{
												'rotate-45 bg-red-500/75': selectedClass === item.name,
												'group-hover:bg-primary/25':
													selectedClass !== item.name,
											}
										)}
									/>
								</div>
							))}
						</div>
					</div>

					<div className='flex flex-col basis-[65%] text-primary/75'>
						<div>
							<h2 className='p-2 bg-primary/20 rounded-md'>Popular Builds</h2>
							{popularFilteredBuilds.map((item) => (
								<div key={item.id} className='flex justify-between w-full'>
									<Image
										src={item.class.image}
										width={50}
										height={50}
										className='h-10 w-10'
										alt='class image'
									/>
									<p>
										{item.build.spec.name}
										{item.build.name}
									</p>
									<div>
										{item.build.weapons.map((weapon: any) => (
											<div key={weapon.weapon.id}>{weapon.weapon.name}</div>
										))}
									</div>
								</div>
							))}
						</div>
						<div>
							<h2 className='p-2 bg-primary/20 rounded-md'>Other Builds</h2>
							<div>{selectedClass} build 1</div>
							<div>{selectedClass} build 2</div>
							{filteredBuilds.map((item) => (
								<div key={item.id} className='flex justify-between w-full'>
									<Image
										src={item.class.image}
										width={50}
										height={50}
										className='h-10 w-10'
										alt='class image'
									/>
									<p>
										{item.build.spec.name}
										{item.build.name}
									</p>
									<div>
										{item.build.weapons.map((weapon: any) => (
											<div key={weapon.weapon.id}>{weapon.weapon.name}</div>
										))}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default page
