// index.js
// where your node app starts

// init project
var express = require('express');
export var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

const dateMiddleware = (req) => {
  let _date = req?.params?.date;
  let timestamp = {}
  if(Number(Date.parse(_date)) > 0 && _date){
    timestamp = {
      unix : Math.floor(new Date(_date).getTime()),
      utc : new Date(_date).toUTCString(),
    }
  }else if (new Date(Number(_date)).getTime() > 0){
    timestamp = {
      unix : Number(_date),
      utc : new Date(Number(_date)).toUTCString(),
    }
  }else{
    timestamp = { error : "Invalid Date" }
  }
  
  return timestamp
}

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/", function (req, res) {
  const timestamp = {
    unix : Math.floor(new Date().getTime()),
    utc : new Date().toUTCString(),
  }
  res.json(timestamp);
});

app.get("/api/:date?", function (req, res) {
  const timestamp = dateMiddleware(req);
  res.json(timestamp);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
