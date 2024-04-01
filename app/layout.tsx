import { SessionProvider } from 'next-auth/react'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
const inter = Inter({ subsets: ['latin'] })

import Navbar from '@/components/Navbar'
import { auth } from '@/auth'
import Footer from '@/components/Footer'
import { Toaster } from '@/components/ui/sonner'

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
					className={`${inter.className} flex flex-col justify-center w-full min-h-screen dark md:min-w-[1200px] no-scrollbar`}
				>
					<Navbar />
					{children}
					<Analytics />
					<Footer />
					<Toaster />
				</body>
			</html>
		</SessionProvider>
	)
}
