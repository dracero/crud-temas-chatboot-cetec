/** @type {import('next').NextConfig} */

/*const nextConfig = {
  reactStrictMode: true,
}*/

// next.config.js
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://crud-temas-chatboot-cetec-r19h2xeuf-diegoracero.vercel.app/:path*',
          },
        ]
      },
  };

//module.exports = nextConfig
