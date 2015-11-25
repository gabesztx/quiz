
module.exports = {
  context: __dirname,
  entry: "./js.files.path.js",
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
        loader: 'babel?presets[]=es2015'
      }
    ]
  }
};