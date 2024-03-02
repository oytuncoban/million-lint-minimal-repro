const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
const MillionLint = require('@million/lint');

const PORT = process.env.PORT ?? 3019;

function getPublicPath(mode) {
  if (mode === 'development') {
    return `http://localhost:${PORT}/`;
  }
  return process.env.PUBLIC_PATH ?? '/';
}

module.exports = (_, argv) => {
  const MODE = argv.mode;
  const isProduction = MODE === 'production';

  return {
    output: {
      publicPath: getPublicPath(MODE),
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },

    devServer: {
      port: PORT,
      historyApiFallback: true,
      hot: true,
      devMiddleware: {
        writeToDisk: true,
      },
    },

    devtool: isProduction ? 'source-map' : 'inline-source-map',

    module: {
      rules: [
        {
          test: /\.m?js/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },

    plugins: [
      new ModuleFederationPlugin({
        name: 'workfiles',
        filename: 'remoteEntry.js',

        exposes: {
          './PortfolioScreenRemote': './src/RemoteApp.jsx',
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        chunks: ['main'],
      }),
      MillionLint.webpack(),
    ],
  };
};
