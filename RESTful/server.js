/*Tayla Orsmond u21467456*/
//required packages
var express = require('express');
var bodyParser = require('body-parser');
var xml2js = require('xml2js');
var fs = require('fs');
const cors = require('cors');
//type of app
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({
    origin: ['https://localhost:3000', 'http://localhost:8080']
}));
var routes = require('./routes.js')(app,fs,xml2js);

//port to run app on
var port = process.env.PORT || 3000;
app.listen(port);
console.log('server running on port ' + port);

//test server
app.get('*', function (req, resp) {
    resp.send('Hello, world! Welcome to my schedule api!');
})