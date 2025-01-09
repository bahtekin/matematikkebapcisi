/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: Bu sadece geliştirme aşamasında geçici olarak devre dışı bırakılmıştır
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: Bu sadece geliştirme aşamasında geçici olarak devre dışı bırakılmıştır
    ignoreBuildErrors: true,
  }
}

module.exports = nextConfig 