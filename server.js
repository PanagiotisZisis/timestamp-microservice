var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/:date', function(req, res) {
   
   var date = req.params.date;
   var dateFormattingOptions = {
       year: 'numeric',
       month: 'long',
       day: 'numeric'
   };
   
    if (isNaN(date)) {
       var naturalDate = new Date(date);
       naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
       var unixDate = new Date(date).getTime()/1000;
       if (naturalDate == 'Invalid Date') {
           naturalDate = null;
           unixDate = null;
       }
   } else {
       var unixDate = date;
       var naturalDate = new Date(date * 1000)
       naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
       if (naturalDate == 'Invalid Date') {
           naturalDate = null;
           unixDate = null;
       }
   }
   
   res.json({
       unix: unixDate,
       natural: naturalDate
   });
    
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!')
});