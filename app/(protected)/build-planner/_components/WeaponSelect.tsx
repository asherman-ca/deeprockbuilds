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
import { selectedWeaponsType } from './Client'
import { Button } from '@/components/ui/button'
import { Spec } from '@/schemas/dataSchemas'
import Image from 'next/image'

interface WeaponSelectProps {
	index: string
	setSelectedWeapons: (arg: SetStateAction<selectedWeaponsType>) => void
	selectedWeapons: selectedWeaponsType
	selectedSpec: Spec
	canEdit: boolean
	handleWeaponSelect: (weapon: any, index: any) => void
}

const WeaponSelect: FC<WeaponSelectProps> = ({
	index,
	setSelectedWeapons,
	selectedWeapons,
	selectedSpec,
	canEdit,
	handleWeaponSelect,
}) => {
	const remainingWeapons = selectedSpec.weapons.filter((w) => {
		return !Object.values(selectedWeapons).some((sw) => sw?.id === w.id)
	})
	return (
		<Dialog>
			<div className='flex gap-4 flex-col'>
				<div className='flex gap-4 items-center'>
					<DialogTrigger asChild disabled={!canEdit}>
						<Button
							variant='outline'
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
							key={c.id}
							disabled
							className='h-[40px] border-primary/50 border rounded-md flex-grow'
							variant='outline'
						></Button>
					))}
				</div>
			</div>
			<DialogContent className='bg-secondary'>
				<DialogHeader>
					<DialogTitle>Weapon Selection</DialogTitle>
					<DialogDescription>Select Weapon Slot {index}</DialogDescription>
				</DialogHeader>
				<div className='grid grid-cols-8 gap-2'>
					{remainingWeapons.map((w) => (
						<TooltipProvider delayDuration={100} key={w.id}>
							<Tooltip>
								<TooltipTrigger tabIndex={-1} asChild>
									<Image
										loading='eager'
										src={w.image}
										height={90}
										width={180}
										className='p-1 h-10 flex-grow border-primary/50 border rounded-md cursor-pointer hover:bg-primary/10'
										alt='weapon-image'
										onClick={() => {
											handleWeaponSelect(w, index)
										}}
									/>
								</TooltipTrigger>
								<TooltipContent
									side='bottom'
									className='border border-primary/50 rounded-md p-2 w-[250px] space-y-1 bg-secondary/90'
								>
									<p className='font-semibold text-base'>{w.name}</p>
									<p className='text-[#DA8200]/90'>{w.description}</p>
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
