module.exports = isDev => {
  return {
    preserveWhitespace: true, // 去掉尾部空格
    extractCSS: !isDev, // 提取 vue 中的 css
    cssModules: {
      localIdentName: isDev
        ? "[path]-[name]-[hash:base64:5]"
        : "[hash:base64:5]", // 方便找，不会重复，有保密性
      camelCase: true // 把 css 中的中划线转成小驼峰
    },
    // hotReload: false // 热重载，根据环境变量生成
    loaders: {},
    preLoader: {},
    postLoader: {}
  };
};
