var express = require('express');
var router = express.Router();

var config = require('../config.js').get(process.env.NODE_ENV);

var clientID = config.clientID;
var returnUri = config.returnUri; 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { link: 'https://api.instagram.com/oauth/authorize/?client_id='+clientID+'&redirect_uri='+returnUri+'&response_type=code' });
});

//debug: console.log('moroalku');

module.exports = router;
