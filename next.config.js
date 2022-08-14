const { env } = require('./src/server/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        images: {
            allowFutureImage: true
        }
    }
};

module.exports = nextConfig;
