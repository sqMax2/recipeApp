const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleTracker = require("webpack-bundle-tracker");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "../static/frontend/js"),
        filename: pathdata => (pathdata.chunk.name + '.js'),
        publicPath: '/static/'
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new BundleTracker({filename: '../static/frontend/webpack-stats.json'})
    ],
    devServer: {
        historyApiFallback: true,
        hot: true,
        devMiddleware: {
          index:            true,
          writeToDisk:      true,

          serverSideRender: true,
        }
    }
}