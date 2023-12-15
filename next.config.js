/** @type {import('next').NextConfig} */
const csvLoader = {
  test: /\.csv$/,
  use: [
    {
      loader: 'csv-loader',
      options: {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true
      }
    }
  ]
};
module.exports = {
  webpack: (config) => {
    config.module.rules.push(csvLoader);
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'betalen.keramischetegelshop.nl',
        port: '',
      },
    ],
  },
}