module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/pages/:id',
        destination: '/pages?id=:id&type=pages',
      },
      {
        source: '/blog/:id',
        destination: '/pages?id=:id&type=blog',
      },
    ];
  },
  webpack: config => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });

    return config;
  },
};
