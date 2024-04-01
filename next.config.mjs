/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['deeprockgalactic.wiki.gg', 'i.imgur.com', 'imgur.com'],
	},
	typescript: {
		ignoreBuildErrors: true,
	},
}

export default nextConfig
