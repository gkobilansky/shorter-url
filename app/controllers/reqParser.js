'use strict';

function reqparser(app, db) {

    this.postUrl = function (req, res) {
        var url = req.url;
        
        if (url.indexOf('new') !== -1) {
            //url passed through API
            url = req.url.substring(5);
        } else { 
            //url passed through form
            url = req.body.url;    
        }
        
        console.log(url);
        
        if(!validateURL(url)) {
            res.send({
            "error": "This is not a valide URL."
            });
        } else {
            var urlObj = {
            "original_url": url,
            "short_url": process.env.APP_URL + linkGen()
            };
    
           save(urlObj, db);
           res.send(urlObj);
        }
    };

    this.getUrl = function (req, res) {
        var url = req.url.substring(1);
        findURL(url, db, res);
    };

    function linkGen() {
        // Generates random four digit number for link
        var num = Math.floor(100000 + Math.random() * 900000);
        return num.toString().substring(0, 4);
    }

    function save(obj, db) {
        // Save object into db.
        var sites = db.collection('sites');
        sites.save(obj, function(err, result) {
            if (err) throw err;
            console.log('Saved ' + result);
        });
    }

    function findURL(link, db, res) {
        // Check to see if the site is already there
        var sites = db.collection('sites');
        // get the url
        console.log(link);
        sites.findOne({
            "short_url": process.env.APP_URL + link
        }, function(err, result) {
            if (err) throw err;
            // object of the url
            if (result) {
             // we have a result
            console.log('Found ' + result);
            console.log('Redirecting to: ' + result.original_url);
            res.redirect(result.original_url);
        } else {
            // we don't
            res.send({
            "error": "This url is not in the database."
        });
      }
    });
  }

    function validateURL(url) {
        // Checks to see if it is an actual url
        // Regex from https://gist.github.com/dperini/729294
        var regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regex.test(url);
  }

}

module.exports = reqparser;