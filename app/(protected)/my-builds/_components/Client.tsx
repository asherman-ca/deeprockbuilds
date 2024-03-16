'use client'
import { FC } from 'react'

interface ClientProps {
	builds: any
}

const Client: FC<ClientProps> = ({ builds }) => {
	console.log('builds', builds)
	return (
		<div className='parent'>
			<div className='gutters py-4'>Client</div>
		</div>
	)
}

export default Client
