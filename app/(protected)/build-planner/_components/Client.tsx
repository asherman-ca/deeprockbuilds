'use client'
import { Class, Spec } from '@/schemas/dataSchemas'
import { FC, useState } from 'react'
import Header from './Header'

interface ClientProps {
	data: Class[] | null | any
}

const Client: FC<ClientProps> = ({ data }) => {
	const [selectedClass, setSelectedClass] = useState<string>('Scout')
	const [selectedSpec, setSelectedSpec] = useState<Spec>(data![0].specs[0])

	return (
		<div className='parent'>
			<div className='gutters py-4 space-y-4'>
				<Header
					selectedSpec={selectedSpec}
					setSpec={setSelectedSpec}
					classes={data}
				/>
				<div>Weapon Selection</div>
			</div>
		</div>
	)
}

export default Client
