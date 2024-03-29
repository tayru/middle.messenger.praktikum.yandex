const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV === 'production'

const stylesHandler = MiniCssExtractPlugin.loader

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        open: true,
        host: 'localhost',
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true
                },
                exclude: ['/node_modules/']
            },
            {
                test: /\.pcss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader']
            },

            {
                test: /\.(eot|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset'
            },
            {
                test: /\.svg$/i,
                type: 'asset/source'
            },
            {
                test: /\.hbs$/,
                use: ['raw-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js'],
        alias: {
            handlebars: 'handlebars/dist/handlebars.js'
        }
    }
}

module.exports = () => {
    if (isProduction) {
        config.mode = 'production'
    } else {
        config.mode = 'development'
    }
    return config
}
