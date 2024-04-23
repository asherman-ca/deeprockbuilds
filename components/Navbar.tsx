'use client'

import { FC } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import DropdownMenu from './DropdownMenu'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { protectedRoutes } from '@/routes'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { FaUser } from 'react-icons/fa'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
	const pathname = usePathname()
	const user = useCurrentUser()
	const tabs = [
		{ title: 'Meta Builds', slug: '/' },
		{ title: 'Tierlist', slug: '/tierlist' },
		{ title: 'My Builds', slug: '/my-builds' },
		{ title: 'Build Planner', slug: '/build-planner' },
		{ title: 'Database', slug: '/database' },
	]

	return (
		<div className='w-full flex flex-col items-center '>
			<div className='flex justify-between items-center py-4 w-[90%] sm:w-[80%] max-w-[1400px]'>
				<Link href={'/'}>
					<h2 className='font-semibold'>DeeprockBuilds</h2>
				</Link>
				<div className='flex gap-2 items-center'>
					{user && (
						<>
							<Avatar className='h-6 w-6'>
								<AvatarImage src={user?.image || ''} />
								<AvatarFallback>
									<FaUser />
								</AvatarFallback>
							</Avatar>
							<h2 className='text-sm'>{user.name}</h2>
						</>
					)}
					<DropdownMenu />
				</div>
			</div>
			<div className='flex justify-center bg-primary/10 w-full'>
				<div className='w-[90%] sm:w-[80%] max-w-[1400px] flex justify-center'>
					{tabs.map((tab) => {
						if (protectedRoutes.includes(tab.slug) && !user) {
							return (
								<TooltipProvider delayDuration={100} key={tab.slug}>
									<Tooltip>
										<TooltipTrigger tabIndex={-1} asChild>
											<div
												className={cn(
													'py-2 hover:bg-primary/15 text-ellipsis text-nowrap overflow-hidden px-1 md:px-5 text-primary/75 hover:text-primary',
													{
														'border-b-2 border-primary': tab.slug === pathname,
													}
												)}
											>
												{tab.title}
											</div>
										</TooltipTrigger>
										<TooltipContent
											side='bottom'
											className='border border-primary/50 rounded-md p-2 w-[250px] space-y-1 bg-secondary/90'
										>
											<p className='font-semibold text-base'>
												Account required:
											</p>
											<p className='text-[#DA8200]/90'>
												Login or register from the navbar
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)
						} else {
							return (
								<Link
									// rel='preconnect'
									key={tab.slug}
									href={tab.slug}
									className={cn(
										'py-2 hover:bg-primary/15 text-ellipsis text-nowrap overflow-hidden px-1 md:px-5 text-primary/75 hover:text-primary cursor-pointer',
										{
											'border-b-2 border-primary': tab.slug === pathname,
											// 'cursor-not-allowed':
											// 	protectedRoutes.includes(tab.slug) && !user,
										}
									)}
								>
									{tab.title}
								</Link>
							)
						}
					})}
				</div>
			</div>
		</div>
	)
}

export default Navbar
