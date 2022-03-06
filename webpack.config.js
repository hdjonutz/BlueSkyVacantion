const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const SvgoTransformer = require('./src/tools/webpack/svgo-transformer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const argv = require('yargs').argv;
const git = require('git-rev-sync');
const moment = require('moment');
const pkg = require('./package.json');

const buildDate = moment().format('YYYYMMDD');
// const gitHash = git.long();
// const gitBranch = process.env['BRANCH_NAME'] || git.branch();

const isProduction = (argv && argv.mode == 'production');
console.log('**********************************************');
console.log(argv, argv.mode);
console.log('isProduction: ', isProduction);
console.log('**********************************************');
module.exports = Object.assign({
    entry: { index: path.resolve(__dirname, "src", "index.tsx") },
    output: {
        filename: isProduction ? '[name].js' : 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        chunkFilename: '[chunkhash].js',
        publicPath: ''
    },
    target: 'web',
    module: {
        rules: [
            {
                // At some places (e.g. inline onclick handlers in HTML code) we use jquery without importing the
                // module. For these cases we have to define it globally.
                test: require.resolve("moment"),
                loader: "expose-loader",
                options: {
                  exposes: "moment"
                },
            },
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
            /*{ test: /\.(png|svg)$/, use: 'url-loader?limit=10000' }, */
            {
                // Load all svg files that aren't directly included into the bundle by default.
                test: /\.svg$/,
                exclude: [/node_modules/, path.resolve(__dirname, "src/assets/svg")],
                use: [
                    'file-loader?name=[name].[ext]',
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                {"cleanupIDs": false}
                            ]
                        }
                    },
                ]
            },
            {
                // Include our icon set directly into the bundle to avoid loading these small files one by one (which
                // would be a performance hit). We also strip away the color and use currentColor instead to let them
                // take the same color as the font.
                test: /\.svg$/,
                include: path.resolve(__dirname, "src/assets/svg"),
                use: [
                    { loader: 'svg-sprite-loader', options: {  } },
                    'svg-fill-loader?fill=currentColor',
                    {
                        loader: 'svgo-loader',
                        options: {
                            plugins: [
                                { removeAttrs: { attrs: '(color|style)' } },
                            ]
                        }
                    },
                ]
            },
            { test: /\.(jpg|gif)$/, use: 'file-loader' },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
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
                                return pkg.name;
                            }
                        },
                        {
                            search: /\{!VERSION!\}/ig,
                            replace: function (match, p1, offset, string) {
                                return pkg.version;
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
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.css', '.less', '.scss', '.svg'],
    },
    plugins: [
        new webpack.ProvidePlugin({
            moment: "moment"
        }),
        new ProgressBarPlugin(),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "templates/index.html")
        }),
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery"
        // }),
        new CopyWebpackPlugin({
            patterns: [
                { from: "src/assets/icons", to: "assets/icons" },
                { from: "src/assets/images", to: "assets/images" },
                { from: "src/assets/svg", to: "assets/svg" },
                { from: "src/assets/slider/default", to: "assets/slider/default" },
                { from: "src/assets/slider/images", to: "assets/slider/images" },
                { from: "src/assets/slider/products", to: "assets/slider/products" },
                // { from: "src/components/pages/Home/MasterSlideComponent/masterslider", to: "masterslider" },
                // {
                //     // Copy all svg asset files and run the svgo transformer over them (to make the svg files a lot
                //     // smaller).
                //     context: 'src/assets/svg',
                //     from: '**/*.svg',
                //     to: 'assets/svg',
                //     transform: SvgoTransformer /* isDevelopmentMode ? null : SvgoTransformer*/
                // },
            ],
        }),
    ],
    mode: isProduction ? 'production': 'development',
	watchOptions: {
		ignored: /node_modules/,
	},
    optimization: isProduction ? {
        minimizer: [new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    drop_console: true,
                }
            }
        })],
        splitChunks: {
            chunks: 'all',
        },
    } : {},
    devServer: {
        compress: true,
        port: 8086,
        hot: true,
    },
}, !isProduction ? {devtool: 'source-map'} : {});
