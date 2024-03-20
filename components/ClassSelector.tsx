import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'

interface ClassSelectorProps {
	setSelectedClass: any
	selectedClass: string
	classes: any[]
}

const ClassSelector: FC<ClassSelectorProps> = ({
	setSelectedClass,
	selectedClass,
	classes,
}) => {
	return (
		<div className='flex flex-col bg-primary/10 w-full rounded-md'>
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
						className='rounded-md h-10 w-10 bg-primary/20 p-1'
						src={item.image}
						alt={item.name}
						width={25}
						height={25}
					/>
					<p
						className={cn('', {
							'group-hover:text-primary/100': selectedClass !== item.name,
							'text-primary/100': selectedClass === item.name,
						})}
					>
						{item.name}
					</p>
					<span
						className={cn('h-5 w-5 bg-primary/10 ml-auto transition-all', {
							'rotate-45 bg-red-500/75': selectedClass === item.name,
							'group-hover:bg-primary/25': selectedClass !== item.name,
						})}
					/>
				</div>
			))}
		</div>
	)
}

export default ClassSelector
