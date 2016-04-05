'use strict';

var path = process.cwd();
var timeStamp = require(path + '/app/controllers/timestamp.js');

module.exports = function (app) {

	app.route('/')
	   .get( function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	var timestamp = new timeStamp();	
		
    app.route('/:time')
       .get(timestamp.getTime);
};