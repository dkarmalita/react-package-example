# pkg

npm init -y

npm add -D webpack webpack-cli
npm add -D babel-core babel-loader babel-preset-env babel-preset-react

// Support spreads
npm add -D babel-plugin-transform-object-rest-spread

// Support react state assignment
npm add -D babel-plugin-transform-class-properties

echo '{ "presets": ["env", "react"] }' > .babelrc

mkdir src && echo "console.log('Hello World')" > ./src/index.js

webpack.config.js
```js
const webpack = require('webpack');
var path = require('path');

var libraryName = 'library';
var plugins = []
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
  plugins: plugins,
};
```

scripts
```
  "scripts": {
    "build": "webpack --mode production",
    "start": "webpack  --mode development --progress --colors --watch",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
