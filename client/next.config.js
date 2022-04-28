/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'farm66.staticflickr.com',
      'farm20.staticflickr.com',
      'farm19.staticflickr.com',
      'farm18.staticflickr.com',
      'farm17.staticflickr.com',
      'farm16.staticflickr.com',
      'farm15.staticflickr.com',
      'farm14.staticflickr.com',
      'farm13.staticflickr.com',
      'farm12.staticflickr.com',
      'farm11.staticflickr.com',
      'farm10.staticflickr.com',
      'farm9.staticflickr.com',
      'farm8.staticflickr.com',
      'farm7.staticflickr.com',
      'farm6.staticflickr.com',
      'farm5.staticflickr.com',
      'farm4.staticflickr.com',
      'farm3.staticflickr.com',
      'farm2.staticflickr.com',
      'farm1.staticflickr.com',
      'farm0.staticflickr.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/mountain',
        permanent: true,
      },
    ]
  },
  env: {
    URL: 'https://snapshot-nextjs.herokuapp.com',
  },
}

module.exports = nextConfig
