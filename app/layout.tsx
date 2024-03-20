import { SessionProvider } from 'next-auth/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

import Navbar from '@/components/Navbar'
import { auth } from '@/auth'
import Footer from '@/components/Footer'

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
				<body
					className={`${inter.className} flex flex-col justify-center w-full min-h-screen dark`}
				>
					<Navbar />
					{children}
					<Footer />
				</body>
			</html>
		</SessionProvider>
	)
}
