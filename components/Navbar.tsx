'use client'

// burger code
// https://codepen.io/RRoberts/pen/ZBYaJr

import { FC, useEffect, useRef, useState } from 'react'
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
import { toast } from 'sonner'

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

	const menuRef = useRef(null as any)
	const buttonRef = useRef(null as any)

	const [isOpen, setIsOpen] = useState<boolean>(false)

	const handleClick = (event: any) => {
		event.stopPropagation()
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target) &&
				!buttonRef.current.contains(event.target)
			) {
				setIsOpen(false)
			}
		}

		// Bind the event listener
		document.addEventListener('mouseup', handleClickOutside)
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mouseup', handleClickOutside)
		}
	}, [])

	return (
		<div className='w-full flex flex-col items-center relative border-b-4 border-primary/10 md:border-b-0'>
			<div className='flex justify-between items-center py-4 w-[90%] sm:w-[80%] max-w-[1400px]'>
				<div className='flex items-center gap-2'>
					<Link href={'/'}>
						<h2 className='font-semibold'>DeeprockBuilds</h2>
					</Link>
					<div
						className={`hamburger ${isOpen && `is-active`} md:hidden`}
						id='hamburger-6'
						onClick={handleClick}
						ref={buttonRef}
					>
						<span className='line'></span>
						<span className='line'></span>
						<span className='line'></span>
					</div>
				</div>
				<div className='flex gap-2 items-center'>
					{user && (
						<>
							<Avatar className='h-6 w-6'>
								<AvatarImage src={user?.image || ''} />
								<AvatarFallback>
									<FaUser />
								</AvatarFallback>
							</Avatar>
							<h2 className='text-sm hidden md:block'>{user.name}</h2>
						</>
					)}
					<DropdownMenu />
				</div>
			</div>
			{isOpen && (
				<div
					ref={menuRef}
					className='absolute z-10 bg-secondary w-full top-full px-[5%] py-4 flex flex-col gap-4'
				>
					{tabs.map((tab) => {
						if (protectedRoutes.includes(tab.slug) && !user) {
							return (
								<TooltipProvider delayDuration={100} key={tab.slug}>
									<Tooltip>
										<TooltipTrigger tabIndex={-1} asChild>
											<div
												className={cn(
													'py-2 hover:bg-primary/15 text-ellipsis text-nowrap overflow-hidden px-1 md:px-5 text-primary/75 hover:text-primary cursor-pointer'
												)}
												onClick={() => {
													toast.error('Login or register to access this page')
												}}
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
			)}
			<div className='justify-center bg-primary/10 w-full hidden md:flex'>
				<div className='w-[90%] sm:w-[80%] max-w-[1400px] flex justify-center'>
					{tabs.map((tab) => {
						if (protectedRoutes.includes(tab.slug) && !user) {
							return (
								<TooltipProvider delayDuration={100} key={tab.slug}>
									<Tooltip>
										<TooltipTrigger tabIndex={-1} asChild>
											<div
												className={cn(
													'py-2 hover:bg-primary/15 text-ellipsis text-nowrap overflow-hidden px-1 md:px-5 text-primary/75 hover:text-primary cursor-pointer'
												)}
												onClick={() => {
													toast.error('Login or register to access this page')
												}}
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
