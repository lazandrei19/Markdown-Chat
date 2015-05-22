var express = require('express');
var router = express.Router();
var passwordHash = require('password-hash');
var mongo = require('mongodb').MongoClient;

/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie('logged');
	res.clearCookie('username');
	res.render('signin');
});

router.post('/', function(req, res, next) {
	res.clearCookie('logged');
	res.clearCookie('username');
	
	//Connectt to Mongodb and do all of that
	mongo.connect("mongodb://127.0.0.1/chat", function(err, db) {
		if(err) throw err;
		var users = db.collection('users');

		users.findOne({username: req.body.username}, {"_id": false, "password": true, uniq: true}, function(err, item) {
			if(item){
				if(passwordHash.verify(req.body.password, item.password)) {
					res.render('index', { uniq: item.uniq });
					if(req.body.remember == "") {
						
					}
				}
			}
		});
	});
});

module.exports = router;