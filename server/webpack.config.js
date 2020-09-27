const nodeExternals = require("webpack-node-externals");
const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  target: "node",
  externals: [nodeExternals()],
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      entities: path.resolve(__dirname, "entities"),
      middleware: path.resolve(__dirname, "middleware"),
      migrations: path.resolve(__dirname, "migrations"),
      resolvers: path.resolve(__dirname, "resolvers"),
      utils: path.resolve(__dirname, "utils"),
    },
    modules: ["src"],
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist")
  }
};