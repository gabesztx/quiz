require("babel-polyfill");

module.exports = {
  context: __dirname,
  entry: ["babel-polyfill", "./js.files.path.js"],
  output: {
    path: __dirname+'/dist',
    filename: "main.js"
  },
  watch: false,
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          plugins: ['syntax-async-functions', 'syntax-decorators'],
          presets: ['es2015', 'stage-0']
        }
      }
    ]
  }
};