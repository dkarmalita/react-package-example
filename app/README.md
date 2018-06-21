# app

npm init -y
npm add react react-dom 
npm add -D react-hot-loader

npm add -D babel-core babel-loader babel-preset-env babel-preset-react
npm add -D webpack webpack-cli webpack-dev-server 

// Support spreads
npm add -D babel-plugin-transform-object-rest-spread

// Support react state assignment
npm add -D babel-plugin-transform-class-properties

## SCSS support

npm add -D node-sass
npm add -D style-loader css-loader sass-loader 
npm add -D postcss-loader autoprefixer postcss-easy-import

### png, jpg, gif, svg support

npm add -D url-loader

------

echo '{ "presets": ["env", "react"] }' > .babelrc

mkdir src && echo "console.log('Hello World')" > ./src/index.js

cd ..
mkdir dist && cd dist && touch index.html

webpack.config.js
```js
const webpack = require('webpack');

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
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
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
```

dist/index.html
```html
<!DOCTYPE html>
<html>
  <head>
    <title>The Minimal React Webpack Babel Setup</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/bundle.js"></script>
  </body>
</html>
```

src/index.js
```
import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>{title}</div>,
  document.getElementById('app')
);

module.hot.accept();
```

scripts
```
  "scripts": {
    "start": "webpack-dev-server --mode development --open --hot",
    "build": "webpack --mode production",
    ...
  },
```

https://www.robinwieruch.de/minimal-react-webpack-babel-setup/
https://github.com/babel/babel-loader
https://stackoverflow.com/a/50420481

idea about babel-loader
```
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        plugins: [require('@babel/plugin-proposal-object-rest-spread')]
      }
    }
```
