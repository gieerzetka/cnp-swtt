const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');

const htmlPlugin = new HtmlWebPackPlugin({
	template: "./src/html/index.html",
	filename: "./index.html"
});

module.exports = {
	entry:  {
		app: './src/js/index.tsx',
		vendor: [
			'react',
			'react-dom'
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "awesome-typescript-loader"
					},
				]
			}
		]
	},
	plugins: [
		htmlPlugin
	]
};
