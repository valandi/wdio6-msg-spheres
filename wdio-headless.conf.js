const baseConfig = require('./wdio.conf.js');

exports.config = Object.assign({}, baseConfig.config, {
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: ['--headless', '--disable-gpu'],
      },
    },
  ],
})
