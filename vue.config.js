const webpack = require("webpack")

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pwa: {
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/, 
        /manifest\.json$/ 
      ]
    },
    themeColor: '#1da025',
    iconPaths: {
      favicon16: 'img/icons/baikly.png',
      favicon32: 'img/icons/baikly.png',
      appleTouchIcon: 'img/icons/baikly.png',
      maskIcon: 'img/icons/baikly.png',
      msTileImage: 'img/icons/baikly.png'
    }
  },
  chainWebpack: config => {
    config.plugin('prefetch').tap((options) => {
      if (!options[0].fileBlacklist) options[0].fileBlacklist = []
      options[0].fileBlacklist.push(/(.*)\.route\.(.*)\.js|css|css\.map$/)
      return options
    })
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ],
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    }
  }
}
