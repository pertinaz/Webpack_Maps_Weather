const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');


module.exports = {
 mode: 'production', // development or production
 entry: './src/index.js',
 output: {
   filename: 'bundle.js',
   path: path.resolve(__dirname, 'dist'),
 },
 module: {
   rules: [
     {
       test: /\.js$/,
       exclude: /node_modules/,
       use: {
         loader: 'babel-loader',
         options: {
           presets: ['@babel/preset-env'],
         },
       },
     },
     {
       test: /\.css$/,
       use: ['style-loader', 'css-loader'],
     },
     {
       test: /\.(png|svg|jpg|jpeg|gif)$/i,
       type: 'asset/resource',
     },
   ],
 },
 plugins: [
   new CleanWebpackPlugin(),
 ],
 optimization: {
   minimize: true,
   minimizer: [
     new TerserPlugin(),
     new CssMinimizerPlugin(),
   ],
 },
 devtool: 'source-map',
 devServer: {
   static: './dist',
   open: true,
 },
};
