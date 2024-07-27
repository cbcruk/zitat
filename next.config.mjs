/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/search': ['./zitat.db'],
    },
  },
}

export default nextConfig
