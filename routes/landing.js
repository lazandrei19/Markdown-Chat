var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.clearCookie('password');
	res.clearCookie('username');
	res.render('landingpage');
});

module.exports = router;