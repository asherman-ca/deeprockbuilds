import { Button } from '@/components/ui/button'
import { Build, BuildResponse } from '@/schemas/dataSchemas'
import { Paperclip, Trash } from 'lucide-react'
import Image from 'next/image'
import { FC } from 'react'

interface HeaderProps {
	build: BuildResponse
	isOwner: boolean
}

const Header: FC<HeaderProps> = ({ build, isOwner }) => {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex gap-4 text-primary/75'>
				<Image
					className='p-1 bg-primary/10 rounded-md w-auto h-[72px]'
					src={build.spec.image}
					height={60}
					width={60}
					alt='spec image'
				/>
				<div className='flex flex-col justify-center gap-2'>
					<h1 className='font-semibold text-primary'>{build.name}</h1>
					<p className=''>
						{build.spec.name} {build.class.name}
					</p>
				</div>
			</div>

			<div className='flex gap-4 items-center'>
				{isOwner && (
					<Button variant='ghost' className='gap-2'>
						<Trash className='h-5 w-5' />
						Delete
					</Button>
				)}
				<Button variant='secondary' className='gap-2'>
					<Paperclip className='h-5 w-5' />
					Share
				</Button>
			</div>
		</div>
	)
}

export default Header
