const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/script.ts',
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ['ts-loader', 'eslint-loader'],
            exclude: /node_modules/,
        }, {
            test: /\.(scss)$/,
            use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['precss', 'autoprefixer']

                        }
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ]
        }],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        publicPath: 'dist',
        filename: 'script.js',
        path: path.resolve(__dirname, 'dist'),
    },
};