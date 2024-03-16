import { FC } from 'react'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'
import { Spec } from '@/schemas/dataSchemas'

interface HeaderProps {
	classes: any
	setSpec: (arg: Spec) => void
	selectedSpec: Spec
}

const Header: FC<HeaderProps> = ({ classes, setSpec, selectedSpec }) => {
	return (
		<div className='flex justify-between'>
			<div className='flex items-center gap-4'>
				<Image
					className='p-1 bg-primary/10 rounded-md h-full w-auto'
					src={selectedSpec.image}
					height={60}
					width={60}
					alt='spec image'
				/>
				<div className='flex flex-col gap-2'>
					<Select
						onValueChange={(value: any) => {
							setSpec(value)
						}}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Classic' />
						</SelectTrigger>
						<SelectContent>
							{classes.map((c: any) => {
								return (
									<SelectGroup>
										<SelectLabel className='p-2'>{c.name}</SelectLabel>
										{c.specs.map((s: any) => {
											return (
												<SelectItem
													className='p-2 py-1 cursor-pointer'
													value={s}
												>
													{s.name}
												</SelectItem>
											)
										})}
									</SelectGroup>
								)
							})}
						</SelectContent>
					</Select>
					<p className='text-primary/80 text-nowrap'>
						DRGS Build Planner Calculator
					</p>
				</div>
			</div>
			<div>
				<button>share</button>
				<button>save build</button>
			</div>
		</div>
	)
}

export default Header
