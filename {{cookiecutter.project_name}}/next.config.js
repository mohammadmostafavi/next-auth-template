/** @type {import('next').NextConfig} */
const nextConfig = {
   publicRuntimeConfig: {
    title: 'My Next.js Application',
    BASE_URL: process.env.BASE_URL,
   }
}

module.exports = nextConfig
