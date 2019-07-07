module.exports = {
  /**
   * You will need to set baseUrl if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then baseUrl should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/zh/config/#baseurl
   */
  baseUrl: process.env.VUE_APP_BASEURL,

  chainWebpack(config) {}
}
