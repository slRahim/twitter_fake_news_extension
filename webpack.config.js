const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   mode: 'production',
   entry: {
      content: path.resolve(__dirname, ".", "src/scripts", "content_script.js"),
      popup: path.resolve(__dirname, ".", "src/popup", "popup.js"),
   },
   output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].bundel.js",
   },
   devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      port: 9595,
      hot: true,
    },
   module: {
      rules: [
         {
            test: /\.(scss)$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: () => [
                      require('autoprefixer')
                    ]
                  }
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
          }
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [{from: ".", to: ".", context: "public"}]
      }),
   ],
};