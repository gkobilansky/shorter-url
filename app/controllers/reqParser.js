'use strict'

function reqparser() {
    
    this.getHeader = function (req, res) {
        
        var ipaddress = req.headers['x-forwarded-for'],
            language = req.headers['accept-language'].substr(0, req.headers['accept-language'].indexOf(',')),
            software = req.headers['user-agent'].slice(req.headers['user-agent'].indexOf('(') + 1, req.headers['user-agent'].indexOf(')'))
        console.log(req.headers);
        
        var whoamiInfo = {
            ipaddress: ipaddress,
            language: language,
            software: software
        }
        
        res.send(whoamiInfo);
    }
    
}

module.exports = reqparser;
    