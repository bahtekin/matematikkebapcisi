/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.ytimg.com', 
      'img.youtube.com', 
      'youtube.com',
      'res.cloudinary.com',
      'localhost',
      'via.placeholder.com'
    ],
  },
  eslint: {
    ignoreDuringBuilds: true
  },
}

module.exports = nextConfig 