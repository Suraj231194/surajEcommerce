/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // appDir is now stable in recent versions, but keeping this just in case
    },
    // Ensure we don't conflict with Vite's output if running simultaneously (though we shouldn't)
    distDir: '.next',
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
    },
}

export default nextConfig;
