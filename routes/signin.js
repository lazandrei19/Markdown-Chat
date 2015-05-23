var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var mongo = require('mongodb').MongoClient;
var Cookie = require('cookies');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie('password');
	res.clearCookie('username');
	res.render('signin');
});

router.post('/', function(req, res, next) {
	res.clearCookie('password');
	res.clearCookie('username');
	var cookies = new Cookie(req, res);
	
	//Connectt to Mongodb and do all of that
	mongo.connect("mongodb://127.0.0.1/chat", function(err, db) {
		if(err) throw err;
		var users = db.collection('users');

		users.findOne({username: req.body.username}, {"_id": false, "password": true, uniq: true}, function(err, item) {
			if(item){
				if(passwordHash.verify(req.body.password, item.password)) {
					//SET COOKIES at 6 months, delete on index if not good
					cookies.set('username', req.body.username, {maxAge: 15552000000, path: '/'});
					cookies.set('password', req.body.password, {maxAge: 15552000000, path: '/'});
					if(req.body.remember == "") {
						cookies.set('remember', 'true', {maxAge: 15552000000, path: '/'});
					} else {
						cookies.set('remember', 'false', {maxAge: 15552000000, path: '/'});
					}
					res.redirect('/');
				}
			}
		});
	});
});

module.exports = router;