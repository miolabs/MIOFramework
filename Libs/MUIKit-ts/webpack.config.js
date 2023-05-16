// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const DeclarationBundlerPlugin = require('types-webpack-bundler')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const isProduction = process.env.NODE_ENV == "production";

const config = {
  devtool: 'source-map',
  entry: "./sources/_index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "muikit.js",
    globalObject: 'this',
    library: {
      name: "MUIKit",
      type: "umd",
    },
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },  
  externals: {
    "mio-core": "mio-core",
    "foundation": "foundation",
    "uikit": "uikit"
  },
  plugins: [
    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  //   new DeclarationBundlerPlugin({
  //     moduleName: "'UIKit'",
  //     out: 'index.d.ts',
  //     exclude: ["sources/_index.ts"]
  // }),
  // new CopyWebpackPlugin( {
  //     patterns: [
  //       { from: 'package.json', to: './package.json' }
  //     ]
  //   } ),
  ],
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
