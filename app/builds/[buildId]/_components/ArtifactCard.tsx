import { Artifact } from '@/schemas/dataSchemas'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@radix-ui/react-tooltip'
import Image from 'next/image'
import { FC } from 'react'

interface ArtifactCardProps {
	artifact: Artifact
}

const ArtifactCard: FC<ArtifactCardProps> = ({ artifact }) => {
	return (
		<TooltipProvider key={artifact.id} delayDuration={100}>
			<Tooltip>
				<TooltipTrigger className='h-[50px]'>
					<Image
						src={artifact.image}
						alt='artifact image'
						height={50}
						width={50}
						className='border-primary/50 rounded-md border h-full w-auto py-2 px-4 cursor-auto'
					/>
				</TooltipTrigger>
				<TooltipContent
					sideOffset={10}
					side='bottom'
					className='w-[200px] bg-secondary border-primary/50 border p-2 space-y-1 rounded-md'
				>
					<p className='font-semibold text-base'>{artifact.name}</p>
					<p className='text-[#DA8200]/90'>{artifact.description}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}

export default ArtifactCard
