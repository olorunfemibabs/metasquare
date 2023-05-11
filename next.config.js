// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// }

// module.exports = nextConfig

/** @type {import('next').NextConfig} */
module.exports = {
  webpack: (config, { isServer }) => {
    config.resolve.extensions.push('.mjs');
    config.module.rules.push({
      test: /.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
};