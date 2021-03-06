var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  EOS: {
    DEBUG: '"true"',
    PROTOCOL: '"https"',
    HOST: '"api-kylin.eosasia.one"',
    PORT: '443',
    CHAINID:
        '"5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"',
    CONTRACTNBA: '"aaasports115"',
    APPLICATION: '"aaasportsbet"'
  }

})
