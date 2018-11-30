const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
module.exports = merge(baseConfig, {
        mode: "development",
        optimization: {
            minimizer: [
                new OptimizeCSSAssetsPlugin({}), // 生产环境 会 压缩css代码
            ],
            splitChunks: {
                cacheGroups: {
                    vender: {
                        name: 'vender',
                        // test: path.resolve(__dirname, 'node_modules'), // node_modules文件下的文件使用缓存
                        test: /babel|flexible|vue/, // 含有babel字符的文件 使用缓存
                        chunks: 'initial',
                        enforce: true
                    },
                }
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                title: 'callCenter',
                hash: true,
                minify: true,
                filename: "index.html",
                template: './src/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: 'app.[name].css',
                chunkFilename: 'app.[id].css'
            }),
            new webpack.NamedModulesPlugin(), // 用于启动 HMR 时可以显示模块的相对路径
            new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement 的插件
            new VueLoaderPlugin(),
            new CleanWebpackPlugin(
                ['dist/*'],　 //匹配删除的文件
                {
                    root: __dirname,       　　　　　　　　　　//根目录
                    verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
                    dry:      false        　　　　　　　　　　//启用删除文件
                }
            ),
            new CopyWebpackPlugin([
                {
                    from: __dirname + '/src',
                    to: __dirname + '/dist',
                    ignore: ['*.scss', '*.vue', 'lib/**.*']
                }
            ])
        ],
        devServer: {
            contentBase: path.join(__dirname, 'dist'), // 额外静态文件内容的目录
            publicPath: '/', // 指定构建好的静态文件在浏览器中用什么路径去访问，默认是 /
            compress: true,
            port: 9000,
            hot: true,
            inline: true,
            open:true
        }
    }
 )
 