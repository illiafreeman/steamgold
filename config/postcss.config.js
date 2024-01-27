module.exports = {
  plugins: [
    require('autoprefixer'),
    require('node-css-mqpacker'),
    require('cssnano')({
      preset: [
        'default', {
          discardComments: {
            removeAll: true
          }
        }
      ]
    })
  ]
};
