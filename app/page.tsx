'use client'

import { signIn } from 'next-auth/react'

export default function Home() {
	const onClick = () => {
		signIn('google', {
			callbackUrl: '/',
		})
	}

	return (
		<main>
			<button onClick={onClick}>Login</button>
		</main>
	)
}
