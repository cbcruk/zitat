const bsconfig = require('./bsconfig.json')

const transpileModules = ['rescript'].concat(bsconfig['bs-dependencies'])
const withTM = require('next-transpile-modules')(transpileModules)

const isWebpack5 = false
const config = {
  target: 'serverless',
  pageExtensions: ['jsx', 'js'],
  env: {
    ENV: process.env.NODE_ENV,
  },
  webpack: (config, options) => {
    const { isServer } = options

    if (isWebpack5) {
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
          path: false,
        }
      }

      config.module.rules.push({
        test: /\.m?js$/,
        use: options.defaultLoaders.babel,
        exclude: /node_modules/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      })
    }
    return config
  },
  webpack5: isWebpack5,
  optimizeFonts: false,
}

module.exports = withTM(config)
