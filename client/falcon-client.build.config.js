const config = require('config');

module.exports = {
  devServerPort: (config.port || 3000) + 1,
  CI: process.env.CI && (typeof process.env.CI !== 'string' || process.env.CI.toLowerCase() !== 'false'),
  clearConsole: false,
  useWebmanifest: true,
  serviceWorker: {
    precache: process.env.NODE_ENV === 'production',
    blacklistRoutes: config.proxyEndpoints || []
  },
  i18n: {
    resourcePackages: ['@deity/falcon-i18n']
  },
  moduleOverride: {
    '@deity/falcon-data/dist/Query/Loader': '@deity/falcon-ui-kit/dist/Loader/Loader',
    '@deity/falcon-data/dist/Query/OperationError': '@deity/falcon-ui-kit/dist/Error/OperationError'
  },
  plugins: [
    config => {
      // inject postcss-loader for .css files
      // the same can be done for scss or css modules
      config.module.rules.push({
        test: /\.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('postcss-each')
              ]
            }
          }
        ]
      });
      return config;
    }
  ]
};
