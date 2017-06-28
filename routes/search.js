var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var token = req.query.access_token;

  var pics;
  var getUrl; 

  //debug: console.log('moro1');
  //debug: console.log(OAuthToken);

  var request = require('request');
  //request('https://api.instagram.com/v1/users/self/media/recent/?access_token='+token+'&count=2', function (error, response, body) {
  request('https://www.google.com?s'+token+'&count=2', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      pics = body; // Print the google web page.
      //debug: console.log('pics1 ' +pics);
      getUrl = response.headers;
      //debug: console.log('url1 ' +getUrl);
    }
  });

  //debug: console.log('pics2 ' +pics);
  //debug: console.log('url2 ' +getUrl);


  res.render('loggedin', { title: 'You are now successfully logged in', token: token, fotos: pics, URI: getUrl });

});


module.exports = router;
