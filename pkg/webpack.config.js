const webpack = require('webpack');
var path = require('path');

var libraryName = 'library';
var outputFile = libraryName + '.js';

switch (process.env.NODE_ENV) {
  case 'production':
    outputFile = libraryName + '.min.js'
    break
  case 'development':
  default:
    outputFile = libraryName + '.js';
}

module.exports = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals : {
    react: 'react' // this package has to be installed as dev & peer dependency
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};