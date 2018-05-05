const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
    return {
        preserveWhitespace: true, // 去掉尾部空格
        extractCSS: !isDev, // 提取 vue 中的 css
        cssModules: {
        },
        // hotReload: false // 热重载，根据环境变量生成
        loaders: {
            'docs': docsLoader
        },
        preLoader: {

        },
        postLoader: {

        },
    }
}
