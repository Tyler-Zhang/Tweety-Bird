const webpack = require('webpack');
const path = require("path");
const debug = true;

var prodPlugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console:true
            },
            output: {
                comments: false,
            }
        })
];
let plugins;

if(!debug)
    plugins = prodPlugins;

 module.exports = {
     entry: {
        content:'./src/main.jsx',
    },
     output: {
         path: './bin',
         filename: '[name].bundle.js'
     },
     resolve: {
         extensions: ["", ".js", ".jsx", ".scss", ".css"],
         modulesDirectories: [
             path.resolve("./src"),
             path.resolve("./src/components"),
             path.resolve("./node_modules")
         ]
     },
     watch: debug,
     module: {
         loaders: [
             {
             test: /\.jsx?$/,
             exclude: /node_modules/,
             loader: 'babel',
             query: {
                 presets:['react', 'es2015', 'stage-0'],
                 plugins: ['react-html-attrs']
                }
            },
            {
                test:/\.s?css$/,
                loaders:['style', 'css', 'sass']
            },
            {  
                test: /\.svg$/, 
                loader: 'svg-loader?pngScale=2'},
            {
                test   : /\.(png|jpg)$/,
                loader : 'url-loader?limit=8192'
            },
            {
                test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader : 'file-loader?name=./../files/[hash].[ext]'
            }]
     }, plugins
 };