//扩展webpack的配置

const path = require("path");

module.exports = {
  // 配置webpack
  webpack: {
    //配置别名
    alias: {
      //约定：使用@代表src目录
      "@": path.resolve(__dirname, "src"),
    },
  },
};
