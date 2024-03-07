'use client'

import { FC } from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import DropdownMenu from './DropdownMenu'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
	const pathname = usePathname()
	const user = useCurrentUser()
	const tabs = [
		{ title: 'Meta Builds', slug: 'meta-builds' },
		{ title: 'Tierlist', slug: 'tierlist' },
		{ title: 'My Builds', slug: 'my-builds' },
		{ title: 'Build Planner', slug: 'build-planner' },
		{ title: 'Database', slug: 'database' },
	]

	return (
		<div className='w-full flex flex-col items-center'>
			<div className='flex justify-between items-center py-2 w-[90%] sm:w-[80%] max-w-[1400px]'>
				<h2 className='font-semibold'>DeeprockBuilds</h2>
				<div className='flex gap-2 items-center'>
					{user && <h2 className='text-sm'>{user.name}</h2>}
					<DropdownMenu />
				</div>
			</div>
			<div className='flex justify-center border-b border-t border-primary/20 w-full'>
				<div className='w-[90%] sm:w-[80%] max-w-[1400px] flex justify-center gap-8'>
					{tabs.map((tab) => (
						<Link
							key={tab.slug}
							href={tab.slug}
							className={cn('py-2', {
								'border-b-2 border-primary': '/' + tab.slug === pathname,
							})}
						>
							{tab.title}
						</Link>
					))}
				</div>
			</div>
		</div>
	)
}

export default Navbar
