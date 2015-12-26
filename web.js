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
    request({
        url: 'http://tvsalestream.herokuapp.com/getuserproduct/',
         //URL to hit
        method: 'GET',
        json:true
    }, function(error, response, json){
        if(error) {
            console.log(error);
        } else {
            var str_json = JSON.stringify(json);
            var str_channel = JSON.stringify(onlive_channel);
            res.render(templates_route + 'index.html',{'accountname':'Guest','uid':-1,'productlist':str_json,'onlive_channel':str_channel});
        }
    });
});


// register page.
app.get('/account', function(req, res) {
    res.sendFile(templates_route + 'LoginRegis.html');

});

app.get('/logout', function(req, res) {
    //res.sendFile(templates_route + 'LoginRegis.html');

});

app.post('/checklogin', function(req, response) {
    var body = '';
    var str_json;
    req.on('data', function(data) {
        body += data; 
    });
    req.on('end',function() {
        var temp = body.split("=");
        var temp = temp[1];
        var uurl = 'http://tvsalestream.herokuapp.com/getuserproduct/?uid='+temp;
        request({
            url: uurl,
             method: 'GET',
             json:true
        },function(error,res,userproduct){
             if(error) {
                console.log(error);
            } else {
                response.json(userproduct);
            }
        });
    });
});
app.get('/addproduct',function (req,res) {
    // body...
    res.sendFile(templates_route+'addproduct.html');
});

