var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
app.use(express.static("../JSON")); // exposes index.html, per below



server.listen(5050);

