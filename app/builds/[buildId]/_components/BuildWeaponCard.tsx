import { Weapon } from '@/schemas/dataSchemas'
import Image from 'next/image'
import { FC } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface BuildWeaponCardProps {
	weapon: any
	index: number
}

const BuildWeaponCard: FC<BuildWeaponCardProps> = ({ weapon, index }) => {
	console.log(weapon)

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex gap-4 items-center'>
				<Image
					className='h-16 w-16 border-[#DA8200] border rounded-md p-1'
					src={weapon.weapon.image}
					height={50}
					width={50}
					alt='weapon-image'
				/>
				<div className='flex flex-col gap-1'>
					<p className='text-primary/75'>Weapon {index + 1}</p>
					<p>{weapon.weapon.name}</p>
				</div>
			</div>

			{weapon.overclocks.length > 0 && (
				<div className='flex gap-2'>
					{weapon.overclocks
						.sort(
							(a: any, b: any) => a.overclock.unstable - b.overclock.unstable
						)
						.map((c: any) => (
							<TooltipProvider delayDuration={100} key={c.id}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Image
											src={c!.overclock.image}
											alt='overclock image'
											height={50}
											width={50}
											className={cn(
												'border-primary/50 rounded-md border height-[50px] px-2 py-1',
												{
													'border-red-500/80': c.overclock.unstable,
												}
											)}
										/>
									</TooltipTrigger>
									<TooltipContent
										side='bottom'
										className='border border-primary/50 p-2 w-[200px] space-y-1 bg-secondary/90'
									>
										<p className='font-semibold text-base'>
											{c.overclock.name}
										</p>
										<p className='text-[#DA8200]/90'>
											{c.overclock.description}
										</p>
									</TooltipContent>
								</Tooltip>
							</TooltipProvider>
						))}
				</div>
			)}
		</div>
	)
}

export default BuildWeaponCard
