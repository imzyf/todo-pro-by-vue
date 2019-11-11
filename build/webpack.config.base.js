const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config')
const isDev = process.env.NODE_ENV === 'development'
const postcssPresetEnv = require('postcss-preset-env');

const config = {
    target: 'web',
    entry: path.join(__dirname, '../client/main.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname, '../dist-dev')
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre', // 预处理，或者后处理 post
            //     test: /\.(vue|js|jsx)$/,
            //     loader: 'eslint-loader',
            //     exclude: /node_modules/,
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                // options: createVueLoaderOptions(isDev)
            }, {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                            ]
                        ]
                    },
                },
            }, {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv( /* pluginOptions */ )
                            ]
                        }
                    },
                    "sass-loader"
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            ident: 'postcss',
                            plugins: () => [
                                postcssPresetEnv( /* pluginOptions */ )
                            ]
                        }
                    },
                ]
            }, {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8192, // 小于8192字节的图片打包成base 64图片
                        name: 'images/[name].[hash:8].[ext]',
                    }
                }]
            }, {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
        }
    }
}

module.exports = config
