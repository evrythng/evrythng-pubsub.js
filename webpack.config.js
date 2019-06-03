const { resolve } = require('path')
const webpack = require('webpack')

const path = resolve(__dirname, 'dist')
const entry = './src/evrythng-pubsub.js'
const library = 'PubSub'

const plugins = [
  // Load mqtt.js file without shebang
  new webpack.NormalModuleReplacementPlugin(/^mqtt$/, "mqtt/dist/mqtt.js"),
]

const babelrc = {
  presets: ['@babel/preset-env'],
}

const browserConfig = {
  entry,
  plugins,
  output: {
    path,
    library,
    filename: 'evrythng-pubsub.browser.js',
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

const nodeConfig = {
  entry,
  target: 'node',
  plugins,
  output: {
    path,
    library,
    filename: 'evrythng-pubsub.node.js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/
    }]
  }
}

module.exports = [
  browserConfig,
  nodeConfig
]
