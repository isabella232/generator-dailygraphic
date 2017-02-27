var path = require('path');
var webpack = require('webpack');
var CONFIG = require('./graphic_config.js').configureTargets('localhost');

module.exports = {
    entry: {
        bundle: [
            'webpack-hot-middleware/client?reload=true',
            path.resolve(path.join('./graphics', CONFIG.SLUG, 'js/graphic.js')),
        ],
        analytics: path.resolve(path.join('graphics', CONFIG.SLUG, 'js/analytics.js'))
    },
    output: {
        path: path.join(__dirname, '/js/'),
        filename: '[name].js',
        publicPath: path.join('/graphics', CONFIG.SLUG, '/js/')
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    resolve: {
        root: [
            path.resolve('./js')
        ]
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
                loader: 'style!css!less'
            }
        ]
    },
    devtool: 'source-maps'
};