import ConstructionAlert from '@/components/ConstructionAlert'
import { FC } from 'react'

interface ClientProps {}

const Client: FC<ClientProps> = ({}) => {
	return (
		<div className='parent flex-1'>
			<div className='gutters py-4 flex-1 flex justify-center items-center'>
				<ConstructionAlert />
			</div>
		</div>
	)
}

export default Client
