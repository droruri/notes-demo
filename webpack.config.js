const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PORT = 8118;
module.exports = {
    mode: 'development',
    devtool: 'source-map',
    resolve:{
      extensions: [".ts", ".tsx"]
    },
    entry: path.join(__dirname, './src/App.tsx'),
    output: {
        library: ['ReactComponents', "App"],
        path: path.resolve(__dirname, 'dist'),
        filename: 'app-bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src']
                    }
                }
            },
            {
                test: /\.css$/,
                include: path.join(__dirname, 'src'),
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true,
                            exportOnlyLocals: true
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        contentBase: 'dist',
        liveReload: false,
        port: PORT,
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        'redux': 'Redux',
        'react-redux': 'ReactRedux',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'dist/index.html'
        })
    ]
};