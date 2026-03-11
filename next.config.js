/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/strapi/:path*',
        destination: `${process.env.STRAPI_URL}/api/:path*`,
      },
    ];
  },
}

module.exports = nextConfig
