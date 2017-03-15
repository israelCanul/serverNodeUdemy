
const webpack = require('webpack');

module.exports = {
  entry: {
    main:'./src/index.js',
  },
  output:{
    path:'/public/',
    filename: '[name].js',
  },
  module:{
    loaders:[
        {
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015','stage-1']
          }
        }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './public',
    inline: true,
    hot: false,
  }
}
