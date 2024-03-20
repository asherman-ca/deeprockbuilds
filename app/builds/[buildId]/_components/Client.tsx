import { Build } from '@/schemas/dataSchemas'
import { FC } from 'react'

interface ClientProps {
	build: Build
}

const Client: FC<ClientProps> = ({ build }) => {
	return <div>Client</div>
}

export default Client
