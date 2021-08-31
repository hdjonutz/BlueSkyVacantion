const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const argv = require('yargs').argv;
const git = require('git-rev-sync');
const moment = require('moment');
const pkg = require('./package.json');

const buildDate = moment().format('YYYYMMDD');
// const gitHash = git.long();
// const gitBranch = process.env['BRANCH_NAME'] || git.branch();

const isProduction = argv && argv.mode !== 'development';
console.log('**********************************************');
console.log(argv);
console.log('**********************************************');

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "index.tsx") },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[chunkhash].js',
        publicPath: ''
    },
    devtool: 'inline-source-map',
    target: 'web',
    module: {
        rules: [
            {
                test: /\.(le|sc)ss?$/,
                exclude: /node_modules/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: isProduction ? "[hash:base64:5]" : "[path][name]__[local]--[hash:base64:5]",
                            },
                            importLoaders: true,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                    {
                        loader: 'postcss-loader'
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            { test: /\.html$/, use: 'html-loader' },
            { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
            { test: /\.(jpg|gif)$/, use: 'file-loader' },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
            {
                // Transform the locale data into Javascript files
                test: /\.icu\.yaml$/,
                loader: './src/tools/webpack/i18n-loader'
            },
            {
                // This fills the version information of the current compiled instance. This is not the version that
                // is monitored on the server to get notified for application updates.
                test: /version.ts$/,
                loader: 'string-replace-loader',
                options: {
                    multiple: [
                        {
                            search: /\{!NAME!\}/ig,
                            replace: function (match, p1, offset, string) {
                                return pkg['name'];
                            }
                        },
                        {
                            search: /\{!VERSION!\}/ig,
                            replace: function (match, p1, offset, string) {
                                return pkg['version'];
                            }
                        },
                        {
                            search: /\{!BUILD_DATE!\}/ig,
                            replace: function (match, p1, offset, string) {
                                return buildDate;
                            }
                        },
                        {
                            search: /\{!GIT_COMMIT!\}/ig,
                            replace: function (match, p1, offset, string) {
                                return 'version_gitHash';
                            }
                        },
                        {
                            search: /\{!GIT_BRANCH!\}/ig,
                            replace: function (match, p1, offset, string) {
                                return 'version_gitBranch';
                            }
                        }
                    ]
                }
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', 'jsx', 'css', 'less', 'scss'],
    },
    plugins: [
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "templates/index.html")
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/assets/icons", to: "assets/icons" },
                { from: "src/assets/images", to: "assets/images" },
            ],
        }),
    ],
    mode: 'development',
	watchOptions: {
		ignored: /node_modules/,
	},
    devServer: {
        compress: true,
        port: 8086,
        hot: true
    },
};
