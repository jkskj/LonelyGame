const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/game": {
        target: "http://xiiaoxiongmc.e2.luyouxia.net:24235",
        ws: true,
        pathRewrite: { "^/game": "" },
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://xiiaoxiongmc.e2.luyouxia.net:24947",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});
