const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

const Dotenv = require('dotenv-webpack');

module.exports = (env, options) => {
  return {
    entry: './app/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './app/index.html',
      }),
      new MiniCssExtractPlugin(),
      new Dotenv(),
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.s?css$/,
          use: [
            options.mode === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[hash:base64]-[local]',
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          rules: [
            {
              test: /\.svg$/i,
              issuer: /\.[jt]sx?$/,
              use: ['@svgr/webpack', 'file-loader'],
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: options.mode === 'development' ? 'inline-source-map' : '',
    devServer: {
      port: 3000,
      host: '0.0.0.0',
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: true,
        },
      },
      hot: true,
    },
  };
};
