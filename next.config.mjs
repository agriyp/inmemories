/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'l07tlsw9avace0qo.public.blob.vercel-storage.com',
            },
        ],
    },
};

export default nextConfig;
