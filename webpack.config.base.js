const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
        entry: {
            main: "./src/main.js",
            // home: "./src/home.js"
        },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: "[name].js",
            chunkFilename: "[name].[hash:8].js"
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'px2rem-loader',
                            // options here
                            options: {
                                unitPrecision: 5,
                                propList: ['*','!font-size','!line-height'],
                                selectorBlackList: [],
                                replace: true,
                                mediaQuery: false,
                                minPixelValue: 0
                            }
                          }
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        // 'style-loader',
                        'css-loader',
                        'sass-loader',
                    ]
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10000,
                                outputPath: 'images',
                                name: '[name].[ext]'
                            },
                        },
                    ],
                },
                {
                    test: /\.js$/,
                    use: [
                        {
                            loader: 'babel-loader',
                        }
                    ],
                    exclude: /node_modules/,
                },
                {
                    test:/\.vue$/,
                    use:'vue-loader',
                }
            ]
        },
        plugins: [
        ],
        
    }