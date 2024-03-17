import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { FC } from 'react'

interface WeaponCardProps {
	selectedWeapons: any
	index: string
	setSelectedWeapons: (arg: any) => void
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
				/>
				<div className='flex flex-col'>
					<p className='text-primary/75'>Weapon {index}</p>
					<p>
						{selectedWeapons[index] ? selectedWeapons[index]!.name : 'Empty'}
					</p>
				</div>
			</div>
			<div className='flex gap-2'>
				{selectedWeapons[index]!.overclocks.map((c: any) => (
					<Button
						className={cn(
							'p-1 border-primary rounded-md border cursor-pointer bg-transparent',
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
							if (selectedWeapons[index]!.selectedOverclocks.includes(c)) {
								setSelectedWeapons((prev: any) => {
									return {
										...prev,
										[index]: {
											...prev[index],
											selectedOverclocks: prev[index].selectedOverclocks.filter(
												(i: any) => i !== c
											),
										},
									}
								})
							} else {
								setSelectedWeapons((prev: any) => {
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
							src={c.image}
							alt='overclock image'
							height={40}
							width={40}
							className='p-1'
						/>
					</Button>
				))}
			</div>
		</div>
	)
}

export default WeaponCard
