module.exports = {
  plugins: [
    [
      'inline-import',
      {
        extensions: ['.md'],
      },
    ],
  ],
  presets: ['next/babel'],
};
