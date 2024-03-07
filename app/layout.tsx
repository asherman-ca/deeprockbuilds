import { SessionProvider } from 'next-auth/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

import Navbar from '@/components/Navbar'
import { auth } from '@/auth'

export const metadata: Metadata = {
	title: 'DeeprockBuilds',
	description: 'Community for deeprock galactic survivors',
}

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const session = await auth()

	return (
		<SessionProvider session={session}>
			<html lang='en'>
				<body className={`${inter.className}`}>
					<Navbar />
					{children}
				</body>
			</html>
		</SessionProvider>
	)
}
