'use strict';

var path = process.cwd();
var reqParser = require(path + '/app/controllers/reqParser.js');

module.exports = function (app) {

	app.route('/')
	   .get( function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	var reqparser = new reqParser();	
		
    app.route('/whoami')
       .get(reqparser.getHeader);
};