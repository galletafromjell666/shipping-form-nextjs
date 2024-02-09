/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
    async redirects() {
        return [
          {
            source: '/',
            destination: '/shipping',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
