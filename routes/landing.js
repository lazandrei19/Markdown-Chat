var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.clearCookie('logged');
	res.clearCookie('username');
	res.render('landingpage');
});

module.exports = router;