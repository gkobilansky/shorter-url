'use strict';

var express = require('express'),
    routes = require('./app/routes/index.js'),
    mongo = require('mongodb').MongoClient,
    app = express();
    
require('dotenv').load();

var host = process.env.IP,
    url = process.env.MONGODB_URI || `mongodb://${process.env.IP}:27017/urldatabase`;

mongo.connect(url, function (err, db) {
    
    if (err) {
        throw new Error('Database failed to connect!');
    } else {
        console.log('MongoDB successfully connected on port 27017.');
    }
    
    app.use('/controllers', express.static(process.cwd() + '/app/controllers'));
    app.use('/public', express.static(process.cwd() + '/public'));
    app.use('/common', express.static(process.cwd() + '/app/common'));
    
    db.createCollection("sites", {
        capped: true,
        size: 5242880,
        max: 5000
    });

    routes(app, db);

    var port = process.env.PORT || 8080;

    app.listen(port,  function () {
	   console.log('Node.js listening on port ' + port + '...');
    });

});