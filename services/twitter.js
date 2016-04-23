var OAuth = require('OAuth').OAuth;


var Twitter = function (twitterKey, twitterSecret) {

  var key = twitterKey;
  var secret = twitterSecret;

  var oauth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    key,
    secret,
    '1.0A',
    null,
    'HMAC-SHA1'
  );
  var getTimeline = function (userKey, userSecret, userId, done) {
    console.log(userId, userKey, userSecret);
    oauth.get(
      'https://api.twitter.com/1.1/statuses/home_timeline.json?user_id=' + userId + '&count=200',
      userKey,
      userSecret,
      function (e, results, res) {
        //console.log(e);
        if (e) {
          console.error('error: ',e,results);
        }
        results = JSON.parse(results)
          //console.log(results.length);
        done(results);
      });
  }
  var getFriends = function (userKey, userSecret, userId, done) {
    console.log(userId, userKey, userSecret);
    oauth.get(
      'https://api.twitter.com/1.1/friends/list.json?user_id=' + userId + '&count=200',
      userKey,
      userSecret,
      function (e, results, res) {
        //console.log(res);
        if (e) console.error('error: ',e,results);
        
        results = JSON.parse(results)
        //console.log(results.length);
        done(results);
      });
  }
    var getMentions = function (userKey, userSecret, userId, done) {
    console.log(userId, userKey, userSecret);
    oauth.get(
      'https://api.twitter.com/1.1/statuses/mentions_timeline.json?user_id=' + userId + '&count=200',
      userKey,
      userSecret,
      function (e, results, res) {
        //console.log(res);
        if (e) console.error('error: ',e,results);

        results = JSON.parse(results)
        //console.log(results.length);
        done(results);
      });
  }
  return {
    getTimeline: getTimeline,
    getFriends: getFriends,
    getMentions:getMentions
  }

}


module.exports = Twitter;
