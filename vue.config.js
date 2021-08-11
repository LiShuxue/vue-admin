module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   */
  publicPath: process.env.VUE_APP_PUBLICPATH,

  devServer: {
    port: 8000,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL,
        pathRewrite: { '^/api': '' },
        secure: false,
        changOrigin: true
      }
    }
  },

  // 关闭production 的sourcemap
  productionSourceMap: false,

  css: {
    loaderOptions: {
      // 引入全局的scss
      scss: {
        implementation: require('sass'),
        additionalData: `@import "~@/assets/style/base.scss";`
      }
    }
  }
};
