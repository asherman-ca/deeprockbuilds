'use client'

import { FC } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { useCurrentUser } from '@/hooks/useCurrentUser'

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
	const user = useCurrentUser()
	const onClick = () => {
		signIn('google', {
			callbackUrl: '/',
		})
	}

	const onLogout = () => {
		signOut()
	}

	return (
		<div className='flex justify-between items-center p-2'>
			<h2 className='font-bold text-xl'>DeeprockBuilds</h2>
			{!user ? (
				<Button size='icon' className='' variant='outline' onClick={onClick}>
					<FcGoogle className='h-5 w-5' />
				</Button>
			) : (
				<div className='flex gap-4 items-center'>
					<h2>{user.name}</h2>
					<Button size='default' variant='outline' onClick={onLogout}>
						Logout
					</Button>
				</div>
			)}
		</div>
	)
}

export default Navbar
