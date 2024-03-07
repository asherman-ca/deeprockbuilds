'use client'
import { FC } from 'react'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { FaUser } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'

interface DropDownMenuProps {}

const DropDownMenu: FC<DropDownMenuProps> = () => {
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
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar className='h-6 w-6'>
					<AvatarImage src={user?.image || ''} />
					<AvatarFallback>
						<FaUser className='' />
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{!user ? (
					<>
						<DropdownMenuLabel>Login/Register</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<Button
								size='icon'
								className='m-2 cursor-pointer'
								variant='outline'
								onClick={onClick}
							>
								<FcGoogle className='h-5 w-5' />
							</Button>
						</DropdownMenuItem>
					</>
				) : (
					<div className='flex gap-4 items-center'>
						<Button size='default' variant='link' onClick={onLogout}>
							Logout
						</Button>
					</div>
				)}
				{/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Profile</DropdownMenuItem>
				<DropdownMenuItem>Billing</DropdownMenuItem>
				<DropdownMenuItem>Team</DropdownMenuItem>
				<DropdownMenuItem>Subscription</DropdownMenuItem> */}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default DropDownMenu
