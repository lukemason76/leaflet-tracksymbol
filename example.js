var PORT = 8000;
var HOST = '127.0.0.1';
var express = require('express');
var http = require('http');
var app = express();

// this will make Express serve your static files
var serverPath = __dirname + '/public';
app.use(express.static(serverPath));

var httpServer = http.createServer(app).listen(PORT);
console.log('Http-server started in port ' + PORT);
