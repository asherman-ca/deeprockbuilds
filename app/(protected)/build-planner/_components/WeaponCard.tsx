import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Overclock } from '@/schemas/dataSchemas'
import Image from 'next/image'
import { FC, SetStateAction } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { selectedWeaponsType } from './Client'

interface WeaponCardProps {
	selectedWeapons: any
	index: string
	setSelectedWeapons: (arg: SetStateAction<selectedWeaponsType>) => void
	canEdit: boolean
	handleOverclockSelect: (overclock: Overclock, index: any) => void
	handleWeaponRemove: (index: string) => void
}

const WeaponCard: FC<WeaponCardProps> = ({
	setSelectedWeapons,
	selectedWeapons,
	index,
	canEdit,
	handleOverclockSelect,
	handleWeaponRemove,
}) => {
	return (
		<div className='flex flex-col gap-4' key={index}>
			<div className='flex gap-4 items-center'>
				<Image
					className={cn(
						'h-16 w-16 border-[#DA8200] border rounded-md p-1 cursor-pointer',
						{
							'cursor-default': !canEdit,
						}
					)}
					src={selectedWeapons[index]!.image}
					height={50}
					width={50}
					alt='weapon-image'
					onClick={() => {
						if (index === '1' || !canEdit) return
						handleWeaponRemove(index)
						// setSelectedWeapons((prev: typeof selectedWeapons) => {
						// 	return {
						// 		...prev,
						// 		[index]: null,
						// 	}
						// })
					}}
				/>
				<div className='flex flex-col'>
					<p className='text-primary/75'>Weapon {index}</p>
					<p>{selectedWeapons[index]!.name}</p>
				</div>
			</div>
			<div className='flex gap-2'>
				{selectedWeapons[index]!.overclocks.sort(
					(a: any, b: any) => a.unstable - b.unstable
				).map((c: Overclock) => {
					if (
						selectedWeapons[index].selectedOverclocks.some(
							(z: any) => z === undefined
						)
					)
						return null
					let overclocksFull =
						selectedWeapons[index]!.selectedOverclocks.length >= 3 &&
						!selectedWeapons[index]!.selectedOverclocks.map(
							(a: any) => a.id
						).includes(c.id)
					let unstablesFull =
						c.unstable &&
						selectedWeapons[index].selectedOverclocks.some(
							(w: any) => w.unstable && w.id !== c.id
						)

					return (
						<TooltipProvider delayDuration={100} key={c.id}>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant='outline'
										className={cn(
											'border-primary/50 rounded-md border cursor-pointer hover:bg-primary/10 flex-grow',
											{
												'border-[#DA8200] bg-transparent': selectedWeapons[
													index
												]!.selectedOverclocks.map((a: any) => a.id).includes(
													c.id
												),
												'border-red-500/75':
													c.unstable &&
													!selectedWeapons[index]!.selectedOverclocks.map(
														(a: any) => a.id
													).includes(c.id),
												'cursor-default': !canEdit,
											}
										)}
										disabled={overclocksFull || unstablesFull}
										onClick={() => {
											handleOverclockSelect(c, index)
										}}
									>
										<Image
											src={c!.image}
											alt='overclock image'
											height={40}
											width={40}
											className='p-2'
										/>
									</Button>
								</TooltipTrigger>
								<TooltipContent
									side='bottom'
									className='border border-primary/50 p-2 w-[200px] space-y-1 bg-secondary/90'
								>
									<p className='font-semibold text-base'>{c.name}</p>
									<p className='text-[#DA8200]/90'>{c.description}</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					)
				})}
			</div>
		</div>
	)
}

export default WeaponCard
