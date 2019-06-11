const { resolve } = require('path')
const webpack = require('webpack')

const path = resolve(__dirname, 'dist')
const entry = './src/index.js'
const library = 'PubSub'

const plugins = [
  // Load mqtt.js file without shebang
  new webpack.NormalModuleReplacementPlugin(/^mqtt$/, 'mqtt/dist/mqtt.js')
]

const babelrc = {
  presets: ['@babel/preset-env']
}

const browserConfig = {
  entry,
  plugins,
  output: {
    path,
    library,
    filename: 'evrythng-pubsub.js',
    libraryTarget: 'var'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: babelrc
      }
    }]
  }
}

module.exports = [
  browserConfig
]
