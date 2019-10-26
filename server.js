var express = require('express');
var app = express();
require('./src/router/router')(app);
app.set('views',__dirname + '/src/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use("/public",express.static("public"));
app.use('/scripts', express.static(__dirname + '/node_modules'));

const fs = require('fs');



var key = fs.readFileSync('private.key');
var cert = fs.readFileSync( 'mydomain.csr' );
const https = require('https');
const server = https.createServer({key: key, cert: cert }, app);
var port = process.env.PORT || 8001;


server.listen(port, () => { console.log('listening on https://localhost:'+ server.address().port) });
