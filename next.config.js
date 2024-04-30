/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'cdn.traction.one',
      'api.github.com',
      'avatars.githubusercontent.com',
      'media.giphy.com',
      'raw.githubusercontent.com'
    ]
  }
}
