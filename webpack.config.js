const GasPlugin = require('gas-webpack-plugin')

module.exports = {
    entry: __dirname + '/dev/index.js',
    output: {
        path: __dirname + '/src',
        filename: 'app.js',
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                },
            },
        }, ],
    },
    plugins: [
        new GasPlugin(),
    ],
};