module.exports = {
    entry: './src/index.ts',
    output: {
        filename: 'dist/index.js',
        path: __dirname,
        devtoolModuleFilenameTemplate: '[absolute-resource-path]'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
        ]
    },
    devtool: 'inline-source-map',
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            'handlebars' : 'handlebars/dist/handlebars.js'
        }
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    optimization: {
        minimize: true
    },
    mode: "development"
};