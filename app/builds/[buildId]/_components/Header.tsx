import { deleteBuild } from '@/actions/build'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { BuildResponse } from '@/schemas/dataSchemas'
import { AlertCircle, Paperclip, Trash } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC, useTransition } from 'react'
import { FaSpinner } from 'react-icons/fa'

interface HeaderProps {
	build: BuildResponse
	isOwner: boolean
}

const Header: FC<HeaderProps> = ({ build, isOwner }) => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const handleDelete = () => {
		startTransition(() => {
			deleteBuild({ id: build.id })
				.then(() => {
					router.push('/my-builds')
				})
				.catch((err) => {
					console.log(err)
				})
		})
	}

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
					<Dialog>
						<DialogTrigger>
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
				<Button variant='secondary' className='gap-2'>
					<Paperclip className='h-5 w-5' />
					Share
				</Button>
			</div>
		</div>
	)
}

export default Header
