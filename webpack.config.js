const webpack = require('webpack')
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const CleanPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const glob = require('glob');

var buildPath = "./web/build";
const config = {
    buildPath: path.resolve(buildPath),
    assetsPath: path.resolve("./assets"),
    cssPath: path.resolve("./assets/css"),
    jsPath: path.resolve("./assets/js"),
    modulesPath: path.resolve("./assets/modules"),
    pluginsPath: path.resolve("./assets/plugins"),
    mapPath: path.resolve(buildPath + '/manifest.json'),
};

// isProduct 判断是否是生产环境
const isProduct = (process.env.NODE_ENV === 'production')
const baseURL = !isProduct ? 'http://localhost:8088/static/' : '/build/'

const getEntry = function(){
    const entry = {}
    const srcDirName = config.jsPath + '/**/*.js'
    glob.sync(srcDirName).forEach(function (filepath) {
        const name = filepath.slice(filepath.indexOf('js') + 'js'.length + 1, -3);
        entry[name] = filepath;
    })
    return entry
};
// console.log(getEntry(config.entryPath));
// return;


const webpackConfig = {
    entry: getEntry(config.jsPath),
    output: {
        path: config.buildPath,
        filename: 'js/[name].[chunkhash:6].js',
        publicPath: baseURL
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    /node_modules/,
                    path.resolve(__dirname, 'assets/js/plugins')
                ],
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.njk$/,
                loader: 'nunjucks-loader'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap&minimize!postcss-loader?sourceMap'
                })
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap&minimize!sass-loader?sourceMap'
                })
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        modules: [
            config.jsPath,
            'node_modules'
        ],
        extensions: ['.js', '.json', '.scss'],
        alias: {
            css: config.cssPath,
            js: config.jsPath,
            module: config.modulesPath,
            plugin: config.pluginsPath
        }
    },
    externals: {
        'jquery': 'window.$',
        'lodash': 'window._'
    },
    devtool: !isProduct ? 'source-map' : false,
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            proxy: 'localhost:8000'
        }),
        new CleanPlugin(['*'], {
            root: config.buildPath
        }),
        new ExtractTextPlugin({filename: "css/[name]-[contenthash:6].css", allChunks: true}),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "_": "lodash",
        }),
        new CommonsChunkPlugin({
            name: "common",
            filename: 'common-[chunkhash:6].js',
            minChunks: 3
        }),
        //生成编译之后的文件映射
        function () {
            this.plugin('done', function (stats) {
                require('fs').writeFileSync(config.mapPath, JSON.stringify(stats.toJson().assetsByChunkName, null, 4));
            })
        }
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        publicPath: '/static',
        host: "0.0.0.0",
        port: "8765",
        compress: true,
        hot: true
    }
}

if (isProduct) {
    webpackConfig.plugins = webpackConfig.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ])
}
module.exports = webpackConfig
