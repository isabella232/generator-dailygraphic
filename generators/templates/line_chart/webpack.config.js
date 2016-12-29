'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        bundle: [
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, 'js/graphic.js'),
        ],
        analytics: path.join(__dirname, 'js/analytics.js')
    },
    output: {
        path: path.join(__dirname, '/js/'),
        filename: '[name].js',
        publicPath: '/js/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            }
        ]
    },
    devtool: 'source-maps'
};