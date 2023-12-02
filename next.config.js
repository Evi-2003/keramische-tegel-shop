/** @type {import('next').NextConfig} */

module.exports = {
  
  images: {
    domains: [process.env.NEXT_PUBLIC_DOAMIN, 'www.nudetuin.nl'],
    formats: ["image/avif", "image/webp"],
  },
};
