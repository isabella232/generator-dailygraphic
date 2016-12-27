const path = require('path');
const fs = require('fs');
const express = require('express');
const nunjucks = require('nunjucks');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const DashboardPlugin = require('webpack-dashboard/plugin');
const config = require('./webpack.config.js');
const context = require('./context');

// setup templates
const app = express();
app.set('view engine', 'html');
nunjucks.configure('./', { 
  autoescape: true,
  express: app,
  watch: true
});

// setup webpack middleware
const compiler = webpack(config);
compiler.apply(new DashboardPlugin());
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: {
    colors: true,
  },
  noInfo: true
});
app.use(middleware);
app.use(webpackHotMiddleware(compiler));

// routes
app.get('/', function(req, res) {
  const templateContext = context.makeContext('test-pym-embed.xlsx');
  res.render('parent_template.html', templateContext);
});

app.get('/child.html', function(req, res) {
  const templateContext = context.makeContext('test-pym-embed.xlsx');
  res.render('child_template.html', templateContext);
});

app.listen('8000', function() {
  console.log('app started on port 8000');
});