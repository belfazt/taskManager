'use strict'

var app = require('./server').app;

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Listening on port: ' + port);