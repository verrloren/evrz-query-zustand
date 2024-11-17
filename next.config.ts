/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
    remotePatterns: [
      {
        protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '/**',
      },
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
				pathname: '/**',
			}
    ],
  },
	typescript: {
		ignoreBuildErrors: true,
	},
};

export default nextConfig;
