var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devServer: {
        inline: true,
        contentBase: './build',
        port: 3001
    },
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js',
    module: {
        rules: [{
                test: /\.js$/,
                loaders: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        name: "[name].[ext]",
                        limit: 2048,
                        outputPath: 'assets/'
                    }
                }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            // If you are having trouble with urls not resolving add this setting.
                            // See https://github.com/webpack-contrib/css-loader#url
                            url: false,
                            minimize: true,
                            sourceMap: true
                        }
                    }]
                }),
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/bundle.min.js'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("styles.css")
    ]
};