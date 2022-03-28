if (process.env.NODE_ENV === "development") {
  module.exports = {
    "transpileDependencies": [
      "vuetify"
    ]}
}
else
{
  module.exports = {
    "transpileDependencies": [
      "vuetify"
    ],
  
    publicPath: '',
    configureWebpack: config => {
      config.optimization.splitChunks = false;
      config.output.filename = '[name].js';
      config.output.chunkFilename = '[name].js';
    },
    chainWebpack: config => {
      config.plugin('extract-css')
        .tap(([options, ...args]) => [
          Object.assign({}, options, { filename: '[name].css' }),
          ...args
        ])
    }
  }
}