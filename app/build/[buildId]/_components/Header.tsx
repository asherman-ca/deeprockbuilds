import { FaSpinner } from 'react-icons/fa'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FC, useState } from 'react'
import { BuildResponse, Spec } from '@/schemas/dataSchemas'
import { Pencil } from 'lucide-react'

interface HeaderProps {
	setModified: (value: boolean) => void
	setBuildName: (value: string) => void
	buildName: string
	modified: boolean
	isPending: boolean
	selectedSpec: Spec
	build: BuildResponse
	isOwner: boolean
}

const Header: FC<HeaderProps> = ({
	setModified,
	buildName,
	setBuildName,
	modified,
	isPending,
	selectedSpec,
	build,
	isOwner,
}) => {
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const dateString = new Date(build.updatedAt).toLocaleDateString()

	return (
		<div className='flex justify-between'>
			<div className='flex items-center gap-4'>
				<Image
					className='p-1 bg-primary/10 rounded-md h-full w-auto'
					src={selectedSpec.image}
					height={60}
					width={60}
					alt='spec image'
				/>
				<div className='flex flex-col gap-2'>
					<div className='flex items-center gap-4'>
						{isEditing ? (
							<Input
								placeholder={buildName || 'build name...'}
								className='h-[28px]'
								value={buildName}
								onChange={(e) => {
									setBuildName(e.target.value)
									setModified(true)
								}}
							/>
						) : (
							<h1 className='text-lg text-nowrap'>
								{buildName ? buildName : 'unnamed build'}
							</h1>
						)}
						{isOwner && (
							<Pencil size={20} onClick={() => setIsEditing((p) => !p)} />
						)}
					</div>
					<p className='text-nowrap'>{selectedSpec.name}</p>
					<p className='text-sm text-primary/75 text-nowrap'>
						updated on {dateString}
					</p>
				</div>
			</div>

			{modified && <Button variant='outline'>Save Changes</Button>}
		</div>
	)
}

export default Header
