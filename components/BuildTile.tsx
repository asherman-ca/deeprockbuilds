import Image from 'next/image'
import { FC } from 'react'

interface BuildTileProps {
	item: any
}

const BuildTile: FC<BuildTileProps> = ({ item }) => {
	return (
		<div
			key={item.id}
			className='flex justify-between w-full bg-primary-foreground p-4'
		>
			<div className='flex items-center gap-4 w-[40%]'>
				<Image
					src={item.class.image}
					width={50}
					height={50}
					className='h-full p-1 bg-primary/10 rounded-md'
					alt='class image'
				/>
				<div className='flex flex-col justify-start'>
					<p className='text-primary font-semibold'>{item.build.name}</p>
					<p>Spec: {item.build.spec.name}</p>
				</div>
			</div>
			<div className='flex justify-between gap-4'>
				{item.build.weapons.map((weapon: any) => (
					<Image
						src={weapon.weapon.image}
						alt='weapon image'
						height={50}
						width={50}
						className='border-[#DA8200] border p-1 rounded-md'
					/>
				))}
			</div>
		</div>
	)
}

export default BuildTile
