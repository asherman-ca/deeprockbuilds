import Image from 'next/image'
import { FC } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

interface BuildTileProps {
	item: any
}

const BuildTile: FC<BuildTileProps> = ({ item }) => {
	return (
		<div
			key={item.id}
			className='flex justify-between w-full bg-primary/10 p-4'
		>
			<div className='flex items-center gap-4 w-[40%]'>
				<Image
					src={item.class.image}
					width={50}
					height={50}
					className='h-full p-1 bg-primary/20 rounded-md'
					alt='class image'
				/>
				<div className='flex flex-col justify-start'>
					<p className='text-primary font-semibold'>{item.build.name}</p>
					<p>Spec: {item.build.spec.name}</p>
				</div>
			</div>
			<div className='flex justify-between gap-4'>
				{item.build.weapons.map((weapon: any) => (
					<TooltipProvider delayDuration={100} key={weapon.id}>
						<Tooltip>
							<TooltipTrigger tabIndex={-1} asChild>
								<Image
									src={weapon.weapon.image}
									alt='weapon image'
									height={50}
									width={50}
									className='border-[#DA8200] border p-1 rounded-md bg-primary/10'
								/>
							</TooltipTrigger>
							<TooltipContent
								side='bottom'
								className='border border-primary/50 rounded-md p-2 w-[250px] space-y-1 bg-secondary/90'
							>
								<p className='font-semibold text-base'>{weapon.weapon.name}</p>
								<p className='text-[#DA8200]/90'>{weapon.weapon.description}</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				))}
			</div>
		</div>
	)
}

export default BuildTile
