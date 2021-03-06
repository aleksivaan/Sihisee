var express = require('express');
var router = express.Router();

var config = require('../config.js').get(process.env.NODE_ENV);

var clientID = config.clientID;
var clientSecret = config.clientSecret;
var returnUri = config.returnUri; 

var OAuthToken = '';
var picsParsed = '';

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  var token = req.query.code;

  //debug: console.log('moro1');
  //debug: console.log(token);

  var requestPost = require('request');

    requestPost.post(
        'https://api.instagram.com/oauth/access_token', { 
          form: { client_id: clientID, client_secret: clientSecret, grant_type: 'authorization_code', redirect_uri: returnUri, code: token } 
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //debug: console.log(body);
                OAuthToken = JSON.parse(body);
                //debug: console.log(OAuthToken);
                accessToken = OAuthToken.access_token;
                //debug: console.log(accessToken);

                var requestPics = require('request');
                requestPics(' https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken+'&count=50', function (error, response, body) {
                  if (!error && response.statusCode == 200) {
                    picsResponse = body; 
                    picsParsed = JSON.parse(body);
                    //debug: console.log('10th pic likes ' +picsParsed.data[9].likes.count);
                    posts = Object.keys(picsParsed.data).length;
                    //debug: console.log('posts: '+posts);
                    var mostLikedPicResult = mostLikedPic(picsParsed);
                    var checkedUsername = picsParsed.data[0].user.username;  
                    console.log('User: ' +checkedUsername+ ' most liked pic: ' +picsParsed.data[mostLikedPicResult.pic].link+ ' has likes: ' +mostLikedPicResult.likes);

                    res.render('loggedin', { title: 'The results are in', token: OAuthToken.access_token, 
                      fotos: picsParsed.data[mostLikedPicResult.pic].images.low_resolution.url, link: picsParsed.data[mostLikedPicResult.pic].link,
                      likes: mostLikedPicResult.likes });

                  }
                });
            }
        }
    );
  
});

function mostLikedPic(picsJson) {
      var mostLikes = 0;
      var mostLiked = 0;
      var likes = 0; 
      var items = Object.keys(picsJson.data).length;
      for(i = 0; i < items; i++) {
        likes = picsJson.data[i].likes.count;

        if(mostLikes < likes) {
          mostLikes = likes;
          mostLiked = i;
        }
        //debug: console.log("likes:"+mostLikes+", or "+likes+" id:"+mostLiked+" items: "+items);
      } 
      var result = {likes: mostLikes, pic: mostLiked};
      //debug: console.log("f likes:"+mostLikes+", or "+likes+" f id:"+mostLiked);  
      return result; 
}


module.exports = router;
