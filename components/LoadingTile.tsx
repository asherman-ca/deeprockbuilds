import { FC } from 'react'
import { Skeleton } from './ui/skeleton'

interface LoadingTileProps {}

const LoadingTile: FC<LoadingTileProps> = ({}) => {
	return (
		<div className='parent flex-1'>
			<div className='gutters py-4 flex flex-col gap-4 flex-1'>
				<div className='flex gap-4 items-center'>
					<Skeleton className='w-[72px] h-[72px] rounded-md' />

					<div className='flex flex-col gap-2 h-[72px]'>
						<Skeleton className='w-[200px] h-1/2' />
						<Skeleton className='w-[200px] h-1/2' />
					</div>
				</div>

				<Skeleton className='w-full h-3/4' />
			</div>
		</div>
	)
}

export default LoadingTile
