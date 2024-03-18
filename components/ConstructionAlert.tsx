import { WrenchIcon } from 'lucide-react'
import { FC } from 'react'

interface ConstructionAlertProps {}

const ConstructionAlert: FC<ConstructionAlertProps> = ({}) => {
	return (
		<div className='flex justify-center items-center gap-4'>
			<WrenchIcon size={24} />
			Page under construction
		</div>
	)
}

export default ConstructionAlert
