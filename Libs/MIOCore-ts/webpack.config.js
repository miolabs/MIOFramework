// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const DeclarationBundlerPlugin = require('types-webpack-bundler')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./sources/_index.ts",
  output: {
    // path: path.resolve(__dirname, "dist"),
    library: "mio-core",
    libraryTarget: "umd",
    filename: 'mio-core.js'
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    new DeclarationBundlerPlugin({
      moduleName: '"mio-core"',
      out: '@types/index.d.ts',
      exclude: ["sources/_index.ts"]
  }),
  new CopyWebpackPlugin( {
      patterns: [
        { from: 'package.json', to: './package.json' }
      ]
    } ),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
  devtool: 'source-map',
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
