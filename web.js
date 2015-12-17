var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    engines = require('consolidate'),
    request = require('request');

// webpage on port 8000
server.listen(process.env.PORT || 8000); // set server port

var templates_route = __dirname + '/hall/templates/';

app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + 'views');
app.use(express.static(__dirname + '/hall/static'));


// front page.
app.get('/', function(req, res) {
    var onlive_channel = require('./index.js').channels;
    console.log(onlive_channel);

    res.sendFile(templates_route + 'index.html');
});

// register page.
app.get('/account', function(req, res) {
    res.sendFile(templates_route + 'LoginRegis.html');

});

app.get('/logout', function(req, res) {
    //res.sendFile(templates_route + 'LoginRegis.html');

});

app.get('/checklogin', function(req, res) {
    request.get();
});

