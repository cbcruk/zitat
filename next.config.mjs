/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      '/search': ['./zitat.db'],
      '/list/*': ['./zitat.db'],
    },
  },
}

export default nextConfig
