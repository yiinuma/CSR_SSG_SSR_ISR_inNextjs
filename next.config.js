/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.dog.ceo', 'cdn.shibe.online'],
  },
};

module.exports = nextConfig;
