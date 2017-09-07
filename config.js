// var config = require('./config.js').get(process.env.NODE_ENV);

var config = {
    production: {
        clientID: '25285360982a4e7587cea69c040a89cf',
        clientSecret: 'c02ea93821544d43a7809aa7562140ef',
        returnUri: 'http://sihisee.azurewebsites.net/loggedin'
    },
    default: {
        clientID: '25285360982a4e7587cea69c040a89cf',
        clientSecret: 'c02ea93821544d43a7809aa7562140ef',
        returnUri: 'http://localhost:1337/loggedin'
    }
  }
  
  exports.get = function get(env) {
    return config[env] || config.default;
  }
