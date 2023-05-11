/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dedas1ohg/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_UR: process.env.NEXT_PUBLIC_API_UR,
  },
}
