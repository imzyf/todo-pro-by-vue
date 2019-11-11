const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

// 配置
let config

// 默认插件
const defaultPluins = [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    // vue loader
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
        title: 'TODO',
        filename: 'index.html',
        template: path.resolve(__dirname, '../index.html'),
    }),
]

const devServer = {
    port: 8000,
    // host: '0.0.0.0', // 内网 ip 和 local 都可以
    overlay: {
        errors: true // 有错误显示在网页
    },
    hot: true, // 热部署
    // open: true // 打开游览器
}

console.log(isDev)
if (isDev) {
    config = merge(baseConfig, {
        mode: 'development',
        devtool: 'cheap-module-eval-source-map', // 调试代码
        module: {
            rules: [{
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    'stylus-loader'
                ]
            }]
        },
        devServer,
        plugins: defaultPluins.concat([])
    })
} else {
    config = merge(baseConfig, {
        entry: {
            app: path.join(__dirname, '../client/index.js'),
            vendor: ['vue']
        },
        output: {
            filename: 'bundle.[chunkhash:8].js',
            path: path.join(__dirname, '../dist')
        },
        module: {
            rules: [{
                test: /\.styl(us)?$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    'stylus-loader'
                ]
            }]
        }
    })
}

module.exports = config
