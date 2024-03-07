'use client'
import { FC, useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import Image from 'next/image'

const classNames = ['Gunner', 'Scout', 'Driller', 'Engineer'] as const

interface pageProps {
	classes: {
		id: number
		name: (typeof classNames)[number]
		description: string
		image: string
	}[]
}

const page: FC<pageProps> = ({ classes }) => {
	const [selectedClass, setSelectedClass] = useState<
		(typeof classNames)[number] | ''
	>('')

	console.log(selectedClass)

	return (
		<div className='parent'>
			<div className='gutters py-4'>
				<div className='flex justify-between'>
					<h1 className='font-semibold'>DRGS Meta Builds</h1>
					<Input
						type='text'
						placeholder='Search by build or skill...'
						className='w-[250px]'
					/>
				</div>

				<div className='flex gap-4'>
					<div className='flex flex-col basis-[35%]'>
						{classes.map((item, idx) => (
							<div
								key={item.id}
								className={cn(
									'p-2 border-primary/20 flex items-center gap-2 cursor-pointer',
									{
										'border-b': idx !== classes.length - 1,
									}
								)}
								onClick={() => setSelectedClass(item.name)}
							>
								<Image
									className='bg-black rounded-md h-10 w-10'
									src={item.image}
									alt={item.name}
									width={25}
									height={25}
								/>
								<p>{item.name}</p>
							</div>
						))}
					</div>

					<div className='flex flex-col basis-[65%]'>list</div>
				</div>
			</div>
		</div>
	)
}

export default page
