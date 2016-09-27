var express = require('express')
var path = require('path')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')

var sessionConfig = {
  secret: 'aSecret',
  resave: false,
  saveUninitialized: true,
  name: 'productCoockie',
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 5000000
  }
}

app.use(session(sessionConfig))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({extended:true}))
app.use(express.static(path.join(__dirname, "client", "static")))




require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

var port = 8000

app.listen(port, function(){
  console.log('Listening on port', port);
})
