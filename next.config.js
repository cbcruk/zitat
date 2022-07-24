const bsconfig = require('./bsconfig.json')

const transpileModules = ['rescript'].concat(bsconfig['bs-dependencies'])
const withTM = require('next-transpile-modules')(transpileModules)

const config = {
  target: 'serverless',
  pageExtensions: ['jsx', 'js'],
  env: {
    ENV: process.env.NODE_ENV,
  },
  webpack: (config, options) => {
    const { isServer } = options

    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
      }
    }

    config.module.rules.push({
      test: /\.m?js$/,
      type: 'javascript/auto',
      resolve: {
        fullySpecified: false,
      },
    })

    return config
  },
  optimizeFonts: false,
}

module.exports = withTM(config)
