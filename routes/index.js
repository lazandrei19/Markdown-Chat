var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var mongo = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
  mongo.connect("mongodb://127.0.0.1/chat", function(err, db) {
		if(err) throw err;
		var users = db.collection('users');

		users.findOne({username: req.cookies.username}, {"_id": false, "password": true, uniq: true}, function(err, item) {
			if(item){
				if(passwordHash.verify(req.cookies.password, item.password)) {
					//SET COOKIES at 6 months, delete on index if not good

					if(req.cookies.remember == 'false') {
							res.clearCookie('password');
							res.clearCookie('username');
							res.clearCookie('remember');
					}
					res.render('index', {uniq: item.uniq});
				} else {
					res.render('errorPage', {code: "Invalid password", message: "The user stored into your cookies doesn't correspond with that stored in our database", href: 'signin'});
				}
			} else {
				res.render('errorPage', {code: "Invalid user", message: "The user stored into your cookies isn't in our database", href: 'landing'});
			}
		});
	});
	
});

module.exports = router;
