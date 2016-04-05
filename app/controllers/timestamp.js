'use strict'

function timestamp() {
    
    this.getTime = function (req, res) {
        
        var timeInput = req.params.time,
            date, 
            dateJson;
            
        function isValidDate(d) {
           if ( Object.prototype.toString.call(d) !== "[object Date]" )
              return false;
        return !isNaN(d.getTime());
        }    
        
        
        if (!isNaN(timeInput)) {
             date = new Date(timeInput*1000);
        } else {
             date = new Date(timeInput);
        }
        
        if(isValidDate(date)) {
        
            var locale = "en-us",
                month = date.toLocaleString(locale, { month: "long" }),
                day = date.getDate(),
                year = date.getFullYear();
                
            dateJson = {
                unix: date.getTime()/1000,
                natural: month + ' ' + day + ', ' + year
             }
        } else {
            dateJson = {
                unix: null,
                natural: null
            }
        }
        
        res.send(dateJson);
    }
    
}

module.exports = timestamp;
    