import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        domains: ['images.unsplash.com', 'www.wyv.com', 'www.zyb.com.au'],
    },
};

export default nextConfig;
