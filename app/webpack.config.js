const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const cssEasyImport = require('postcss-easy-import')

const isDevelopment = () => process.env.NODE_ENV === 'development'

const scssLoaders = (modules = false) => [
    {
        loader: 'style-loader',
        options: {
            sourceMap: isDevelopment(),
        },
    },
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
            // url: false,
            modules: modules,
            localIdentName: '[name]_[local]_[hash:base64:5]',
        },
    },
    {
        loader: 'postcss-loader',
        options: {
            sourceMap: isDevelopment(),
            plugins: () => [
                autoprefixer,
                cssEasyImport,
            ],
        },
    },
    {
        loader: 'sass-loader',
        options: {
            sourceMap: isDevelopment(),
        },
    },
]


module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
          test: /\.module\.(css|scss)$/,
          use: scssLoaders(true), // FIXME

      },
      {
          test: /\.(css|scss)$/,
          exclude: /\.module\.(css|scss)$/,
          use: scssLoaders(),
      },
      {
          test: /\.png$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8192,
                  mimetype: 'image/png'
              }
          }]
      },
      {
          test: /\.jpg$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8192,
                  mimetype: 'image/jpg',
                  name: '[name].[hash:7].[ext]',
              }
          }]
      },
      {
          test: /\.gif$/,
          use: [{
              loader: 'url-loader',
              options: {
                  limit: 8192,
                  mimetype: 'image/gif',
                  name: '[name].[hash:7].[ext]',
              }
          }]
      },
      {
          test: /.(svg?)(\?[a-z0-9]+)?$/,
          loader: 'url-loader',
          query: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[hash:7].[ext]',
              outputPath: 'assets/',
          },
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: {
      '@kard/react-form': path.resolve(__dirname, '../pkg')
    },
    modules: [
      "node_modules",
      'src'
    ]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    compress: true,
    port: 9000
  }
};
