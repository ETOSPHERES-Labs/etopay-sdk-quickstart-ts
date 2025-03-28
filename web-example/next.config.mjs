/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.experiments = {
      asyncWebAssembly: true, // Enable WASM loading
      topLevelAwait: true, // Allow using 'await' at the top level
      layers: true, // Fix for 'entryOptions.layer' error
    };
    return config;
  },
};

export default nextConfig;
