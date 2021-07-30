const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin(
      {
        template: resolve('public/index.html'),
        filename: 'index.html',
        title: 'mcg-scroll',
      }
    ),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.json', '.vue']
  }
}

