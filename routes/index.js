var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { link: 'https://api.instagram.com/oauth/authorize/?client_id=25285360982a4e7587cea69c040a89cf&redirect_uri=http://localhost:3000/loggedin&response_type=code' });
});

//debug: console.log('moroalku');

module.exports = router;
