const path = require('path');
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')

const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

let config

// 默认插件
const defaultPluins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin()
]

const devServer = {
    port: 8000,
    host: '0.0.0.0', // 内网 ip 和 local 都可以
    overlay: {
        errors: true // 有错误显示在网页
    },
    hot: true, // 热部署
    // open: true // 打开游览器
}

if (isDev) {
    config = merge(baseConfig, {
        devtool: '#cheap-module-eval-source-map', // 调试代码
        module: {
            rules: [
                {
                    test: /\.styl$/,
                    use: [
                        'vue-style-loader', //style-loader，css 没有热重载，要刷新页面；vue-style-loader 则可以
                        {
                            loader: 'css-loader',
                            options: {
                                module: true,
                                localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                            }
                        },
                        'stylus-loader'
                    ]
                }
             ]
        },
        devServer,
        plugins: defaultPluins.concat([
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin()
        ])
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
            rules: [
                {
                    test: /\.styl$/,
                    use: ExtractPlugin.extract({
                        fallback: 'vue-style-loader',
                        use: [
                            'css-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            'stylus-loader'
                        ]
                    })
                }
            ]
        },
        plugins: defaultPluins.concat([
            new ExtractPlugin('styles.[contentHash:8].css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'runtime'
            })
        ])
    })
}

module.exports = config
