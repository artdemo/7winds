const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
  return {
    entry: "./app/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./app/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          use: "html-loader",
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: options.mode === "development",
              },
            },
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          ],
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: options.mode === "development" ? "eval-source-map" : "",
    devServer: {
      port: 3000,
      host: "0.0.0.0",
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
