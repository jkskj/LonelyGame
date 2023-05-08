const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/game": {
        target: "http://xiiaoxiongmc.e2.luyouxia.net:24235",
        ws: false,
        pathRewrite: { "^/game": "" },
        changeOrigin: true,
      },
    },
  },
});
