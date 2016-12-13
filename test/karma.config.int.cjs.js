const node = require('rollup-plugin-node-resolve')
const cjs = require('rollup-plugin-commonjs')

const TESTS = 'test/integration/umd.spec.js'

module.exports = function (config) {
  config.set({
    basePath: '../',
    frameworks: ['jasmine'],
    files: [TESTS],
    preprocessors: {
      [TESTS]: ['rollup']
    },
    rollupPreprocessor: {
      plugins: [
        node({ browser: true }),
        cjs()
      ],
      context: 'window',
      format: 'iife',
      moduleName: 'EVTPubSubIntegration'
    },
    reporters: ['dots'],
    browsers: ['Chrome'],
    singleRun: true
  })
}
