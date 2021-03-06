var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [
    require('postcss-pxtorem')({
      rootValue: 54,
      propList: ['*']
    }),
    require('autoprefixer')({
      browsers: ['last 2 versions', 'Android >= 4.0', 'iOS >= 7']
    })
  ]
}
