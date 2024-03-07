import Link from 'next/link'
import { FC } from 'react'

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
	return (
		<div className='parent border-primary/20 border-t mt-auto py-4'>
			<div className='gutters flex justify-between gap-4'>
				<div className='flex-3 flex flex-col gap-2'>
					<h2 className='font-semibold'>DeeprockBuilds</h2>
					<div className='text-xs flex flex-col gap-1'>
						<p>
							Deeprockbuilds is not affiliated with or endorsed by Funday games
						</p>
						<p>
							Deeprockbuilds is a collection of hand-crafted top meta builds for
							Deeprock Galactic Survivors
						</p>
						<p className='mt-2 font-semibold'>Deeprockbuilds.vercel.app 2024</p>
					</div>
				</div>

				<div className='flex-2 flex flex-col gap-2'>
					<h2 className='font-semibold'>More Links</h2>
					<div className='flex flex-col text-xs gap-1'>
						<Link href={'contact'}>Contact</Link>
						<Link href={'privacy'}>Privacy Policy</Link>
					</div>
				</div>

				<div className='flex-2 flex flex-col gap-2'>
					<h2 className='font-semibold'>Official Links</h2>
					<div className='flex flex-col gap-1 text-xs'>
						<a href=''>Reddit</a>
						<a href=''>Twitter</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
