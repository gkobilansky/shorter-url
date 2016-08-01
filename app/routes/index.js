'use strict';

var path = process.cwd();
var reqParser = require(path + '/app/controllers/reqParser.js');
var bodyParser = require('body-parser');



module.exports = function (app, db) {
	
	app.use(bodyParser.urlencoded({ extended: true }));

	app.route('/')
	   .get( function (req, res) {
			res.sendFile(path + '/public/index.html');
		});
		
	var reqparser = new reqParser(app, db);
	
	
	app.route('/new/:url*')
		.get(reqparser.postUrl);
		
	 app.route('/:url*')
		.get(reqparser.getUrl);	
		
	app.post('/', function(req, res){
		reqparser.postUrl(req, res);
	});	
};

