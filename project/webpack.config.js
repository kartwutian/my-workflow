// var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
// var path = require('path');
// var webpack = require('webpack');
// var fs = require('fs');
// var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

// var srcDir = path.resolve(process.cwd(), 'src');

// //获取多页面的每个入口文件，用于配置中的entry
// function getEntry() {
//     var jsPath = path.resolve(srcDir, 'js');
//     var dirs = fs.readdirSync(jsPath);
//     var matchs = [], files = {};
//     dirs.forEach(function (item) {
//         matchs = item.match(/(.+)\.js$/);
//         console.log(matchs);
//         if (matchs) {
//             files[matchs[1]] = path.resolve(srcDir, 'js', item);
//         }
//     });
//     console.log(JSON.stringify(files));
//     return files;
// }

// module.exports = {
//     cache: true,
//     devtool: "source-map",
//     entry: getEntry(),
//     output: {
//         path: path.join(__dirname, "dist/js/"),
//         publicPath: "dist/js/",
//         filename: "[name].js",
//         chunkFilename: "[chunkhash].js"
//     },
//     resolve: {
//         alias: {
//             jquery: srcDir + "/js/lib/jquery.min.js",
//             core: srcDir + "/js/core",
//             ui: srcDir + "/js/ui"
//         }
//     },
//     plugins: [
//         new CommonsChunkPlugin('common.js'),
//         new uglifyJsPlugin({
//             compress: {
//                 warnings: false
//             }
//         })
//     ]
// };

const webpack = require('webpack');
var path = require('path');
var fs = require('fs');
var srcDir = path.resolve(process.cwd(), 'src');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

//获取多页面的每个入口文件，用于配置中的entry
function getEntry() {
    var jsPath = path.resolve(srcDir, 'js');
    var dirs = fs.readdirSync(jsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.js[x]?$/);
        // console.log(matchs);
        if (matchs) {
            files[matchs[1]] = path.resolve(srcDir, 'js', item);
        }
    });
    // console.log(JSON.stringify(files));
    return files;
};
// console.log(getEntry());
module.exports = {
  entry: getEntry(),
  output: {
    filename: './dist/js/[name].js'
  },
  module: {
    loaders: [
      
      {
        test: /\.js/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-3'],
          compact: false
        },
        include: __dirname
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015','stage-3','react']
        }
      },

      { 
        test: /\.(png|jpg|jpeg)$/, 
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
    //new webpack.optimize.UglifyJsPlugin({
    //  compress: {
    //    warnings: false,
    //  },
    //  output: {
    //    comments: false,
    //  },
    //}),//压缩和丑化

    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   window.jQuery: 'jquery',
    //   jQuery: 'jquery',
    //   _: 'underscore'
    // }),//直接定义第三方库

    new CommonsChunkPlugin({
      name: "init",
      // (the commons chunk name)

      filename: "./dist/js/init.js",
      // (the filename of the commons chunk)

      // minChunks: 2,
      // (Modules must be shared between 3 entries)

      // chunks: ["main", "main1"]
      // (Only use these entries)
    })//定义公共chunk

  ]
};