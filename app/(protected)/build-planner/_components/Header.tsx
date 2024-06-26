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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { Spec } from '@/schemas/dataSchemas'
import { Button } from '@/components/ui/button'
import { Paperclip } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { FaSpinner } from 'react-icons/fa'

interface HeaderProps {
	classes: any
	setSpec: (arg: Spec) => void
	selectedSpec: Spec
	setWeapons: (arg: any) => void
	onSubmit?: () => void
	setBuildName?: (arg: string) => void
	buildName: string
	isPending: boolean
}

const Header: FC<HeaderProps> = ({
	classes,
	setSpec,
	selectedSpec,
	setWeapons,
	onSubmit,
	setBuildName,
	buildName,
	isPending,
}) => {
	return (
		<div className='flex justify-between flex-col md:flex-row gap-4 md:gap-0'>
			<div className='flex items-center gap-4'>
				<Image
					className='p-1 bg-primary/10 rounded-md h-full'
					src={selectedSpec.image}
					height={80}
					width={80}
					alt='spec image'
				/>
				<div className='flex flex-col gap-2'>
					<Select
						onValueChange={(value: any) => {
							setSpec(value)
							setWeapons({
								1: { ...value.primaryWeapon, selectedOverclocks: [] },
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
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='secondary' className='gap-2'>
							Save Build
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Create & Save Build</DialogTitle>
							<DialogDescription>
								Name your {selectedSpec.name} Build
							</DialogDescription>
						</DialogHeader>
						<Input
							placeholder='Build Name...'
							// @ts-ignore
							onChange={(e) => setBuildName(e.target.value)}
						/>
						<Button
							variant='secondary'
							disabled={buildName === '' || isPending}
							onClick={onSubmit}
							className='flex gap-2 items-center'
						>
							{isPending && <FaSpinner className='animate-spin' />}
							{isPending ? 'Creating' : 'Create'} Build
						</Button>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}

export default Header
