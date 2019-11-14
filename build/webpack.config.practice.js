const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConfig = require("./webpack.config.base");
const isDev = process.env.NODE_ENV === "development";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// 配置
let config;

// 默认插件
const defaultPluins = [
  new webpack.ProgressPlugin(),
  new CleanWebpackPlugin(),
  // vue loader
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    title: "TODO",
    filename: "index.html",
    template: path.resolve(__dirname, "../index.html")
  }),
  // ... 忽略 vue-loader 插件
  new MiniCssExtractPlugin({
    filename: "style.css"
  })
];

const devServer = {
  port: 8000,
  // host: '0.0.0.0', // 内网 ip 和 local 都可以
  overlay: {
    errors: true // 有错误显示在网页
  },
  hot: true // 热部署
  // open: true // 打开游览器
};

console.log(isDev);
if (isDev) {
  config = merge(baseConfig, {
    entry: path.join(__dirname, "../practice/index.js"),
    mode: "development",
    devServer,
    plugins: defaultPluins.concat([])
  });
}

module.exports = config;
