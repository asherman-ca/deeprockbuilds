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
import { Button } from '@/components/ui/button'
import { HeartIcon, Paperclip } from 'lucide-react'

interface HeaderProps {
	classes: any
	setSpec: (arg: Spec) => void
	selectedSpec: Spec
	setWeapons: (arg: any) => void
}

const Header: FC<HeaderProps> = ({
	classes,
	setSpec,
	selectedSpec,
	setWeapons,
}) => {
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
							setWeapons({
								1: value.primaryWeapon,
								2: null,
								3: null,
								4: null,
							})
						}}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue placeholder='Classic' />
						</SelectTrigger>
						<SelectContent>
							{classes.map((c: any) => {
								return (
									<SelectGroup key={c.id}>
										<SelectLabel className='p-2'>{c.name}</SelectLabel>
										{c.specs.map((s: any) => {
											return (
												<SelectItem
													className='p-2 py-1 cursor-pointer'
													value={s}
													key={s.id}
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
					<p className='text-primary/75 text-nowrap'>
						DRGS Build Planner Calculator
					</p>
				</div>
			</div>
			<div className='flex gap-4 items-center text-primary/75'>
				<Button variant='ghost' className='gap-2'>
					<Paperclip className='h-5 w-5' />
					Share
				</Button>
				<Button variant='secondary' className='gap-2'>
					Save Build
				</Button>
			</div>
		</div>
	)
}

export default Header
