/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  output: 'export',
  images: {
    domains: ["lh3.googleusercontent.com", "vercel.com"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/github",
  //       destination: "https://github.com/steven-tey/precedent",
  //       permanent: false,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
