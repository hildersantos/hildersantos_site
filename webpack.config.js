const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const config = (env, argv) => {
  const isDev = argv.mode === "development";

  return {
    entry: {
      app: "./resources/scripts"
    },
    output: {
      path: path.resolve(__dirname, "public/assets"),
      filename: "scripts/[name].js",
      publicPath: "/assets/"
    },
    resolve: {
      extensions: [".js", ".scss"]
    },
    optimization: {
      runtimeChunk: {
        name: "manifest"
      },
      splitChunks: {
        minSize: 10000,
        cacheGroups: {
          vendor: {
            name: "vendor",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all"
          }
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: "css-loader",
                options: {
                  sourceMap: true,
                  minimize: !isDev
                    ? { discardComments: { removeAll: true } }
                    : false
                }
              },
              {
                loader: "postcss-loader"
              },
              {
                loader: "sass-loader",
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        },
        {
          test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg|ico)(\?v=.+)?$/,
          exclude: /(\/fonts)/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "images/"
              }
            }
          ]
        }
      ]
    },
    plugins: [
      // Extract CSS
      new ExtractTextPlugin("styles/[name].css", {
        allChunks: true
      }),

      // Copy images
      new CopyWebpackPlugin([{ from: "resources/images", to: "images" }])
    ]
  };
};

module.exports = config;
