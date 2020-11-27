module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   */
  publicPath: process.env.VUE_APP_PUBLICPATH,

  devServer: {
    port: 8000
  },

  // 关闭production 的sourcemap
  productionSourceMap: false,

  chainWebpack(config) {}
}
