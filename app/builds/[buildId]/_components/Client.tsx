import { Build } from '@/schemas/dataSchemas'
import { FC } from 'react'
import Header from './Header'

interface ClientProps {
	build: Build
}

const Client: FC<ClientProps> = ({ build }) => {
	return (
		<div className='parent'>
			<div className='gutters py-4 gap-4 flex flex-col'>
				<Header build={build} />
				<div className='flex gap-4 rounded-md bg-primary/10 p-4'>
					<div className='flex-1 bg-primary/5 p-4 rounded-md flex flex-col gap-4'>
						<p>Weapons:</p>
						{build.weapons.map((weapon, index) => (
							<div key={weapon.weapon.id}>{weapon.weapon.name}</div>
						))}
					</div>
					<div className='flex-1 bg-primary/5 p-4 rounded-md flex flex-col gap-4'>
						<p>Artifacts:</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Client
