var express = require('express');
var app = express();
require('./src/router/router')(app);
app.set('views',__dirname + '/src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use("/public",express.static("public"));
app.use('/scripts', express.static(__dirname + '/node_modules'));
var port = process.env.PORT || 8001;

var server = app.listen(port,function(){
    console.log('listening on https://localhost:'+ server.address().port);
    });

