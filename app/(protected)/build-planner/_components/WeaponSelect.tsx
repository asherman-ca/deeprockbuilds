import { FC, SetStateAction } from 'react'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { selectedWeaponType, selectedWeaponsType } from './Client'
import { Button } from '@/components/ui/button'
import { Spec } from '@/schemas/dataSchemas'
import Image from 'next/image'

interface WeaponSelectProps {
	index: string
	setSelectedWeapons: (arg: SetStateAction<selectedWeaponsType>) => void
	selectedWeapons: selectedWeaponsType
	selectedSpec: Spec
}

const WeaponSelect: FC<WeaponSelectProps> = ({
	index,
	setSelectedWeapons,
	selectedWeapons,
	selectedSpec,
}) => {
	const remainingWeapons = selectedSpec.weapons.filter((w) => {
		return !Object.values(selectedWeapons).some((sw) => sw?.id === w.id)
	})
	return (
		<Dialog>
			<div className='flex gap-4 flex-col'>
				<div className='flex gap-4 items-center'>
					<DialogTrigger asChild>
						<Button
							variant='ghost'
							className='h-16 w-16 border-primary/50 border rounded-md'
						/>
					</DialogTrigger>
					<div className='flex flex-col text-primary/75'>
						<p>Weapon {index}</p>
						<p>Empty</p>
					</div>
				</div>
				<div className='flex gap-2'>
					{selectedSpec.primaryWeapon.overclocks.map((c) => (
						<Button
							disabled
							className='h-[40px] border-primary/50 border rounded-md bg-transparent flex-grow'
						></Button>
					))}
				</div>
			</div>
			<DialogContent className='bg-primary/20'>
				<DialogHeader>
					<DialogTitle>Weapon Selection</DialogTitle>
					<DialogDescription>Select Weapon Slot {index}</DialogDescription>
				</DialogHeader>
				<div>
					{remainingWeapons.map((w) => (
						<TooltipProvider delayDuration={100} key={w.id}>
							<Tooltip>
								<TooltipTrigger tabIndex={-1}>
									<div
										onClick={() => {
											setSelectedWeapons((prev) => {
												return {
													...prev,
													[index]: { ...w, selectedOverclocks: [] },
												}
											})
										}}
									>
										<Image
											src={w.image}
											height={50}
											width={50}
											alt='weapon-image'
										/>
									</div>
								</TooltipTrigger>
								<TooltipContent
									side='bottom'
									className='border border-primary p-2 w-[200px] space-y-1'
								>
									<p className='font-bold'>{w.name}</p>
									<p>{w.description}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					))}
				</div>
			</DialogContent>
		</Dialog>
	)
}

export default WeaponSelect
