'use client'

import { Build } from '@/schemas/dataSchemas'
import { FC } from 'react'
import Header from './Header'
import BuildWeaponCard from './BuildWeaponCard'
import ArtifactCard from './ArtifactCard'

interface ClientProps {
	build: Build
	isOwner: boolean
}

const Client: FC<ClientProps> = ({ build, isOwner }) => {
	return (
		<div className='parent'>
			<div className='gutters py-4 gap-4 flex flex-col'>
				<Header build={build} isOwner={isOwner} />
				<div className='flex gap-4 rounded-md bg-primary/10 p-4'>
					<div className='flex-1 bg-primary/5 p-4 rounded-md flex flex-col gap-4'>
						<p className='font-semibold'>Weapons:</p>
						{build.weapons.map((weapon, index) => (
							<BuildWeaponCard
								key={weapon.weapon.id}
								weapon={weapon}
								index={index}
							/>
						))}
					</div>
					<div className='flex-1 bg-primary/5 p-4 rounded-md flex flex-col gap-4'>
						<p className='font-semibold'>Artifacts:</p>
						<div className='flex gap-2'>
							{build.artifacts.map((artifact) => (
								<ArtifactCard key={artifact.id} artifact={artifact} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Client
