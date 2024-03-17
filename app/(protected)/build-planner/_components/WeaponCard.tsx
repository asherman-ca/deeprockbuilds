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
}

const WeaponCard: FC<WeaponCardProps> = ({
	setSelectedWeapons,
	selectedWeapons,
	index,
}) => {
	return (
		<div className='flex flex-col gap-4' key={index}>
			<div className='flex gap-4 items-center'>
				<Image
					className='h-16 w-16 border-[#DA8200] border rounded-md p-1'
					src={selectedWeapons[index]!.image}
					height={50}
					width={50}
					alt='weapon-image'
					onClick={() => {
						if (index === '1') return
						setSelectedWeapons((prev: typeof selectedWeapons) => {
							return {
								...prev,
								[index]: null,
							}
						})
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
				).map((c: Overclock) => (
					<TooltipProvider key={c.id}>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									className={cn(
										'p-1 border-primary rounded-md border cursor-pointer bg-transparent hover:bg-primary/20',
										{
											'border-[#DA8200]':
												selectedWeapons[index]!.selectedOverclocks.includes(c),
										}
									)}
									disabled={
										selectedWeapons[index]!.selectedOverclocks.length >= 3 &&
										!selectedWeapons[index]!.selectedOverclocks.includes(c)
									}
									onClick={() => {
										if (
											selectedWeapons[index]!.selectedOverclocks.includes(c)
										) {
											setSelectedWeapons((prev: typeof selectedWeapons) => {
												return {
													...prev,
													[index]: {
														...prev[index],
														selectedOverclocks: prev[
															index
														].selectedOverclocks.filter(
															(i: Overclock) => i !== c
														),
													},
												}
											})
										} else {
											setSelectedWeapons((prev: typeof selectedWeapons) => {
												return {
													...prev,
													[index]: {
														...prev[index],
														selectedOverclocks: [
															...prev[index].selectedOverclocks,
															c,
														],
													},
												}
											})
										}
									}}
								>
									<Image
										src={c!.image}
										alt='overclock image'
										height={40}
										width={40}
										className='p-1'
									/>
								</Button>
							</TooltipTrigger>
							<TooltipContent
								side='bottom'
								className='border border-primary p-2 w-[200px] space-y-1'
							>
								<p className='font-bold'>{c.name}</p>
								<p>{c.description}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</div>
		</div>
	)
}

export default WeaponCard
