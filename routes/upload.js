var express = require('express');
var router = express.Router();
var fs = require('fs');

var extensions = ["jpg", "JPG", "jpeg", "jpeg", "gif", "GIF", "bmp", "BMP", "png", "PNG"];

router.post('/',function(req, res, next){
	var data = [];
	if(req.files.files.path){
		if(extensions.indexOf(req.files.files.extension) != -1) {
			var path = req.files.files.path;
			var photo = fs.readFileSync(path);
			var imageData = new Buffer(photo).toString('base64');
			data.push({ file: imageData });
		}
		fs.unlink(req.files.files.path);
	} else {
		for (var i = req.files.files.length - 1; i >= 0; i--) {
			if(extensions.indexOf(req.files.files[i].extension) != -1) {
				var path = req.files.files[i].path;
				var photo = fs.readFileSync(path);
				var imageData = new Buffer(photo).toString('base64');
				data.push({ file: imageData });
			}
			fs.unlink(req.files.files[i].path);
		}
	}
	//res.send(data);
});

module.exports = router;