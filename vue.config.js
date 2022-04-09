const { resolve } = require('path');
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve(__dirname, "src"));

    // config.module.rule('images')
    //   .test(/\.(png|jpg|gif|webp)$/i)
    //   // .include.add(/src\/assets\/.*/).end()
    //   .use('url-loader').loader('url-loader').end()
      // .options({
      //   limit: true,
      //   generator: (content, mimetype, encoding, resourcePath) => {
      //     if (/\.html$/i.test(resourcePath)) {
      //       return `data:${mimetype},${content.toString()}`;
      //     }

      //     return `data:${mimetype}${encoding ? `;${encoding}` : ''},${content.toString(encoding)}`;
      //   }
      // })
  }
})
