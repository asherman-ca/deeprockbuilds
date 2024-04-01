import Link from 'next/link'
import { FC } from 'react'

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
	return (
		<div className='parent border-primary/20 border-t mt-auto py-4 bg-primary/10'>
			<div className='gutters flex justify-between gap-4'>
				<div className='flex-3 flex flex-col gap-2'>
					<h2 className='font-semibold'>DeeprockBuilds</h2>
					<div className='text-xs flex flex-col gap-2'>
						<p>
							<span className='font-semibold text-primary/75'>
								Deeprockbuilds
							</span>{' '}
							is not affiliated with or endorsed by Funday games
						</p>
						<p>
							<span className='font-semibold text-primary/75'>
								Deeprockbuilds
							</span>{' '}
							is a collection of top meta builds for Deeprock Galactic Survivors
						</p>
						<p className='font-semibold'>Deeprockbuilds.vercel.app 2024</p>
					</div>
				</div>

				<div className='flex-2 flex flex-col gap-2'>
					<h2 className='font-semibold'>More Links</h2>
					<div className='flex flex-col text-xs gap-2'>
						{/* <Link href={'contact'}>Contact</Link>
						<Link href={'privacy'}>Privacy Policy</Link> */}
						<p>Contact</p>
						<p>Privacy Policy</p>
					</div>
				</div>

				<div className='flex-2 flex flex-col gap-2'>
					<h2 className='font-semibold'>Official Links</h2>
					<div className='flex flex-col gap-2 text-xs'>
						<a
							href='https://www.reddit.com/r/DRGSurvivor/'
							target='_blank'
							rel='noopener noreferrer'
						>
							Reddit
						</a>
						<a
							href='https://twitter.com/FundayGamesdk'
							target='_blank'
							rel='noopener noreferrer'
						>
							Twitter (X)
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Footer
