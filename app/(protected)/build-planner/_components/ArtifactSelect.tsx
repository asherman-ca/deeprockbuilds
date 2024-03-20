import { Button } from '@/components/ui/button'
import { Artifact } from '@/schemas/dataSchemas'
import Image from 'next/image'
import { FC } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface ArtifactSelectProps {
	artifacts: Artifact[]
	selectedArtifacts: Artifact[]
	setSelectedArtifacts: (arg: (prev: Artifact[]) => Artifact[]) => void
}

const ArtifactSelect: FC<ArtifactSelectProps> = ({
	artifacts,
	selectedArtifacts,
	setSelectedArtifacts,
}) => {
	const onClick = (artifact: Artifact) => {
		if (selectedArtifacts.includes(artifact)) {
			setSelectedArtifacts((prev) => prev.filter((a) => a.id !== artifact.id))
		} else {
			setSelectedArtifacts((prev) => [...prev, artifact])
		}
	}

	return (
		<div className='flex gap-2 flex-wrap'>
			{artifacts?.map((a) => (
				<TooltipProvider delayDuration={100} key={a.id}>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								key={a.id}
								className={cn('border-primary/50 flex-grow h-[50px]', {
									'border-[#DA8200] bg-transparent':
										selectedArtifacts.includes(a),
								})}
								variant='outline'
								disabled={
									selectedArtifacts.length === 5 &&
									!selectedArtifacts.includes(a)
								}
								onClick={() => onClick(a)}
							>
								<Image
									src={a.image}
									key={a.id}
									height={50}
									width={50}
									alt='artifact image'
									className='h-[50px] py-2'
								/>
							</Button>
						</TooltipTrigger>
						<TooltipContent
							side='bottom'
							className='w-[200px] bg-secondary border-primary/50 border p-2 space-y-1'
						>
							<p className='font-semibold text-base'>{a.name}</p>
							<p className='text-[#DA8200]/90'>{a.description}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			))}
		</div>
	)
}

export default ArtifactSelect
