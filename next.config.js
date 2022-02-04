module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/pages/:id',
        destination: '/pages?id=:id&type=pages',
        permanent: true,
      },
      {
        source: '/blog/:id',
        destination: '/pages?id=:id&type=blog',
        permanent: true,
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
