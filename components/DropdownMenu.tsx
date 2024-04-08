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
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/ui/button'
import { signIn, signOut } from 'next-auth/react'
import { ChevronDown } from 'lucide-react'
import { FaUser } from 'react-icons/fa'

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
				{user ? <ChevronDown /> : <FaUser />}
			</DropdownMenuTrigger>
			<DropdownMenuContent className='bg-secondary border-primary/20 border'>
				{!user ? (
					<>
						<DropdownMenuLabel>Login/Register</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Button
								size='icon'
								className='cursor-pointer w-full bg-primary/10 hover:bg-primary/5'
								variant='outline'
								onClick={onClick}
							>
								<FcGoogle className='h-5 w-5' />
							</Button>
						</DropdownMenuItem>
					</>
				) : (
					<Button
						size='default'
						variant='outline'
						onClick={onLogout}
						className='w-full bg-primary/10 hover:bg-primary/5'
					>
						Logout
					</Button>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default DropDownMenu
