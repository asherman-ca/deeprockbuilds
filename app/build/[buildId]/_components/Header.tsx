import { FaSpinner } from 'react-icons/fa'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FC, useState, useTransition } from 'react'
import { BuildResponse, Spec } from '@/schemas/dataSchemas'
import { AlertCircle, Paperclip, Pencil, Trash } from 'lucide-react'
import { deleteBuild } from '@/actions/build'
import { useRouter } from 'next/navigation'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { toast } from 'sonner'

interface HeaderProps {
	setModified: (value: boolean) => void
	setBuildName: (value: string) => void
	buildName: string
	modified: boolean
	selectedSpec: Spec
	build: BuildResponse
	isOwner: boolean
	handleSave: () => void
}

const Header: FC<HeaderProps> = ({
	setModified,
	buildName,
	setBuildName,
	modified,
	selectedSpec,
	build,
	isOwner,
	handleSave,
}) => {
	const router = useRouter()
	const [isEditing, setIsEditing] = useState<boolean>(false)
	const dateString = new Date(build.updatedAt).toLocaleDateString()
	const [isPending, startTransition] = useTransition()

	const handleDelete = () => {
		startTransition(() => {
			deleteBuild({ id: build.id })
				.then(() => {
					router.push('/my-builds')
					router.refresh()
				})
				.catch((err) => {
					console.log(err)
				})
		})
	}

	const handleCopyRoute = () => {
		const currentRoute = window.location.href
		navigator.clipboard.writeText(currentRoute)
		toast.success('Link copied to clipboard')
	}

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
							<div>
								<Pencil
									onClick={() => setIsEditing((p) => !p)}
									className='w-[15px] h-[15px] cursor-pointer'
								/>
							</div>
						)}
					</div>
					<p className='text-nowrap'>{selectedSpec.name}</p>
					<p className='text-sm text-primary/75 text-nowrap'>
						updated on {dateString}
					</p>
				</div>
			</div>
			<div className='flex gap-4 items-center'>
				<Button variant='ghost' className='gap-2' onClick={handleCopyRoute}>
					<Paperclip className='h-5 w-5' />
					Share
				</Button>
				{isOwner && (
					<Dialog>
						<DialogTrigger asChild>
							<Button variant='ghost' className='gap-2'>
								<Trash className='h-5 w-5' />
								Delete
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Delete Build</DialogTitle>
								<DialogDescription>
									Are you sure you want to delete this build?
								</DialogDescription>
								<div className='bg-red-500/25 p-4 rounded-md text-sm flex items-center gap-2'>
									<AlertCircle color='red' />
									This will delete the entire build and all of its data.
								</div>
							</DialogHeader>
							<div className='flex gap-4'>
								<Button
									variant='secondary'
									onClick={handleDelete}
									disabled={isPending}
								>
									{isPending && <FaSpinner className='animate-spin' />}
									{isPending ? 'Deleting' : 'Delete'} Build
								</Button>

								<DialogTrigger>
									<Button variant='ghost'>Cancel</Button>
								</DialogTrigger>
							</div>
						</DialogContent>
					</Dialog>
				)}

				{modified && (
					<Button
						variant='outline'
						onClick={handleSave}
						className='flex gap-2 items-center'
						disabled={isPending}
					>
						{isPending && <FaSpinner className='animate-spin' />}
						Save Changes
					</Button>
				)}
			</div>
		</div>
	)
}

export default Header
