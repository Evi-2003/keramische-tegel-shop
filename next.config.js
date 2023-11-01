/** @type {import('next').NextConfig} */

module.exports = {
    experimental: {
        turbo: {
          rules: {
            '*.md': [
              {
                loader: '@mdx-js/loader',
                options: {
                  format: 'md',
                },
              },
            ],
            '*.mdx': ['@mdx-js/loader'],
          },
        },
      },
  images: {
    domains: [process.env.NEXT_PUBLIC_DOAMIN],
    formats: ["image/avif", "image/webp"],
  },
};
