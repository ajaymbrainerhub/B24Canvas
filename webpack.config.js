require('dotenv').config()
const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['regenerator-runtime/runtime.js', './src/entry.jsx'],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        UNSPLASH_ACCESS_KEY: JSON.stringify(process.env.UNSPLASH_ACCESS_KEY),
        REACT_APP_API_URL: JSON.stringify(process.env.REACT_APP_API_URL),
        REACT_APP_MEDIA_URL: JSON.stringify(process.env.REACT_APP_MEDIA_URL),
        REACT_APP_BOT_ID: JSON.stringify(process.env.REACT_APP_BOT_ID),
        REACT_APP_FILE_MANAGER_API_URL: JSON.stringify(process.env.REACT_APP_FILE_MANAGER_API_URL),
        REACT_APP_REDUX_LOGGER: JSON.stringify(process.env.REACT_APP_REDUX_LOGGER)
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        include: [path.resolve(__dirname, 'node_modules/@fullcalendar'), path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          query: {
            presets: ['@babel/env', '@babel/react']
          }
        }
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'node_modules/@fullcalendar')],
        use: ['style-loader', 'css-loader'],
        exclude: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          }
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /\.module\.css$/
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      { test: /\.jpg$/, loader: 'url-loader?mimetype=image/jpg' },
      {
        test: /\.(png|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '*']
  },
  devtool: 'source-map'
}
