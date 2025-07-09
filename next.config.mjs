/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      NEXT_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_IMG_PATH: process.env.NEXT_PUBLIC_IMG_PATH,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.deshkalnews.com',
          port: '',
          pathname: '**', // allow all paths from this host
        },
      ],
    },
  };
  
  export default nextConfig;
  