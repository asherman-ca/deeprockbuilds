'use client'
import { Build, Class } from '@/schemas/dataSchemas'
import { FC } from 'react'

interface ClientProps {
	data: Class[] | null
}

const Client: FC<ClientProps> = ({ data }) => {
	console.log(data)
	return (
		<div className='parent'>
			<div className='gutters'>Client</div>
		</div>
	)
}

export default Client
