var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('703186593144235', '08c0e83ab9529e9a44160e772a628121');
var twitter = require('../services/twitter')('XMdFNmS90OOV8AZcHueuwnerV', 'K82cZEEryygSDDvbZHnyvx20rlxJDTSNZvnHWFUnrDtZb9zJ3R');

router.use('/', function (req, res, next) {

    if (!req.user) {
      res.redirect('/');
    }
    next();
  })
  /* GET users listing. */

router.use('/', function (req, res, next) {
  if (req.user.twitter) {
    twitter.getTimeline(req.user.twitter.token,
      req.user.twitter.tokenSecret,
      req.user.twitter.id,
      function (results) {
        req.twitter = results;

        req.user.twitter.lastPost = results[0].text;
        twitter.getFriends(req.user.twitter.token,
          req.user.twitter.tokenSecret,
          req.user.twitter.id,
          function (results) {
            //console.log('friends', results.users);
            req.friends = results.users;
            twitter.getMentions(req.user.twitter.token,
              req.user.twitter.tokenSecret,
              req.user.twitter.id,
              function (results) {
                //console.log('friends', results.users);
                req.mentions = results;
                next();
              })
          })
      })
  }

})
router.get('/', function (req, res) {
  //console.log(req.user);

  res.render('users', {
    user: req.user,
    twitter: req.twitter,
    friends: req.friends,
    mentions: req.mentions
  });

});


module.exports = router;
