/** @type {import('next').NextConfig} */

//const nextConfig = {
//  reactStrictMode: true,
//}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://crud-temas-chatboot-cetec-b2o4hf20o-diegoracero.vercel.app/:path*'
      }
    ]
  }
}

//module.exports = nextConfig
