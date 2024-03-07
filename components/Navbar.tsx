'use client'

import { FC } from 'react'

import { useCurrentUser } from '@/hooks/useCurrentUser'
import DropdownMenu from './DropdownMenu'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
	const user = useCurrentUser()
	const tabs = [1, 2, 3, 4, 5]

	return (
		<div className='w-full flex flex-col items-center'>
			<div className='flex justify-between items-center py-2 w-[90%] sm:w-[80%] max-w-[1400px]'>
				<h2 className='font-bold text-lg'>DeeprockBuilds</h2>
				<div className='flex gap-2 items-center'>
					{user && <h2>{user.name}</h2>}
					<DropdownMenu />
				</div>
			</div>
			<div className='flex justify-center gap-4 bg-gray-500 w-full'>
				{tabs.map((tab) => (
					<div>{tab}</div>
				))}
			</div>
		</div>
	)
}

export default Navbar
