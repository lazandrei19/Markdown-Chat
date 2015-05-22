var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var mongo = require('mongodb').MongoClient;
var randtoken = require('rand-token');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie('logged');
	res.clearCookie('username');
	res.render('register');
});

router.post('/', function(req, res, next) {
	res.clearCookie('logged');
	res.clearCookie('username');

	console.log(req.body);
	
	//Connectt to Mongodb and do all of that
	mongo.connect("mongodb://127.0.0.1/chat", function(err, db) {
		if(err) throw err;

		var pass = passwordHash.generate(req.body.password);
		var users = db.collection('users');

		users.findOne({username: req.body.username}, {"_id": false, "password": true}, function(err, item) {
			if(!item) {
				users.insert({username: req.body.username, password: pass, isOnline: false, uMessages: [], uniq: randtoken.generate(64)});
			}
		});
	});
});

module.exports = router;