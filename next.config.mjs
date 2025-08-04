/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure three.js modules are properly transpiled and served with the correct MIME type
  transpilePackages: ["three", "@react-three/fiber"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack(config) {
    // Bundle all three.js related modules together
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        ...config.optimization?.splitChunks,
        cacheGroups: {
          ...(config.optimization?.splitChunks?.cacheGroups ?? {}),
          three: {
            test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
            name: 'three',
            chunks: 'all',
          },
        },
      },
    }
    return config
  },
}

export default nextConfig
