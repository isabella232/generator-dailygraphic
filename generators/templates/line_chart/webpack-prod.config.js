'use strict';

var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: path.join(__dirname, 'js/graphic.js'),
        analytics: path.join(__dirname, 'js/analytics.js')
    },
    output: {
        path: path.join(__dirname, '/dist/js/'),
        filename: '[name].min.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('../css/[name].min.css'),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                join_vars: false,
                dead_code: false,
                unused: false
            }
        })
    ]
};