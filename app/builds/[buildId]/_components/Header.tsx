import { Build } from '@/schemas/dataSchemas'
import { FC } from 'react'

interface HeaderProps {
	build: Build
}

const Header: FC<HeaderProps> = ({ build }) => {
	return <div>{build.name}</div>
}

export default Header
