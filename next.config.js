/** @type {import('next').NextConfig} */

//const nextConfig = {
//  reactStrictMode: true,
//}

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://crud-temas-chatboot-cetec-p5pxmvjnl-diegoracero.vercel.app/:path*'
      }
    ]
  }
}

//module.exports = nextConfig
