var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
    engines = require('consolidate'),
    request = require('request');
    //web = require('./web.js');

var channels = new Object(); // save all channel info
var room_route = __dirname + '/room/templates/';

// share channel data to all backend port
module.exports.channels = channels;
module.exports.app = app;

var web = require('./web.js');


// url base.
var backend_url = 'http://localhost:3000/';
var djangoport_url = 'http://localhost:8000/';
var update_url = 'http://localhost:8000/updatelive/';
var db_url = 'http://tvsalestream.herokuapp.com/';
// server socket on 3000
server.listen(process.env.PORT || 3000); // set server port
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + 'views');
app.use(express.static(__dirname));


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


app.get('/test_chatroom', function(req, res) {
    res.sendFile(room_route + 'test_chatroom.html');
});

app.get('/test_hostroom', function(req, res) {
    var test_js = require('/public/test/test.js');
    var t_id = test_js.fake_id();
    var t_ch = test_js.fake_channel();
    console.log("ID : " + t_id);
    console.log("Channel : " + f_ch);
    // create fake channele 
    res.render(room_route);
});

app.get('/chatroom', function(req, res) {
    // parse url to chatroom.html
    var host_fb_id = req.query.host_fb_id;
    var stream_url = req.query.stream_url;
    res.render(room_route + 'chatroom.html',{'host_fb_id':host_fb_id,'stream_url':stream_url});
});

app.get('/hostroom', function(req, res) {
    // parse url to chatroom.html
    var hostfbid = req.query.hostfbid;
    var stream_url = req.query
    if(!hostfbid) {
        res.sendStatus(404);
        return;
    }
    res.render(room_route + 'hostroom.html',{'host_fb_id':hostfbid});
});

// not sure why lulu keep this.
app.get('/chatroom_lulu', function(req, res) {
    res.sendFile(room_route + 'chatroom_lulu.html');
});
 
app.post('/send_order', function(req, res) {
    // catch dataform, in json
    var body = '';
    var result = '';

    req.on('data', function(data) { 
        body += data;
    });

    req.on('end', function() {
        var data = JSON.parse(body);
        var uid = data.user.fb_id;
        var host_fb_id = data.user.host_fb_id;
        if(!host_fb_id | !uid) {
            res.sendStatus(404);
            return;
        }


        var order = data.order;
        var cur = channels[host_fb_id].CurrentProduct;
        var cur_product = channels[host_fb_id].ProductList[cur];

        // if not init, init it.
        if(!cur_product.order)
        cur_product.order = new Object();

        if(!order && cur_product.order[uid]) {
            delete cur_product.order[uid];
            result = 'cancel order success : ' + cur_product.productname ;;
        } else if(order && !cur_product.order[uid]) {
            cur_product.order[uid] = true;
            result = 'order success : ' + cur_product.productname ;
        } else if(order) {
            result = 'already order : ' + cur_product.productname ;;
        } else {
            result = 'Cannot cancel because you have not ordered it';
        }

        res.status(200);
        res.end(result);
    });
 });

app.get('/get_channel', function(req, res) {
    var hostfbid = req.query.hostfbid;
    if(!hostfbid) {
        res.sendStatus(404);
        return;
    }

    if(!channels[hostfbid]) {
        res.sendStatus(404);
        return;
    }

    res.send(channels[hostfbid]);
});

// initialize channel info from Django server.
app.post('/create_channel', function(req, res) {
    var body = '';
    var qs = require('querystring');
    // on receiving request data
    req.on('data', function(data) {
        body += data; 
    });

    req.on('end', function() {
        //body = qs.parse(body);
        //console.log(body);
        var data = JSON.parse(body);
        var host_fb_id = data.hostfbid; // use fb id as identifier  
        var ProductList = data.productlist;
        var streamurl = data.streamurl; 
        var host_name = data.hostname;      
        console.log(data);
        // put basic info into target channel.
        // other info such as stream url and socket id
        // will be init when create_channel socket catch data.
        channels[host_fb_id] = new Object();
        channels[host_fb_id].ProductList = ProductList;
        channels[host_fb_id].CurrentProduct = 0;
        channels[host_fb_id].PriceList = new Object();
        channels[host_fb_id].customers = new Object();
        channels[host_fb_id].stream_url = streamurl;
        channels[host_fb_id].host_name = host_name;    
        res.render(room_route + 'chatroom.html', data);

    });

});

// Socket port define and implement here.
io.sockets.on('connection', function(socket) {

    socket.on('create_channel',function(req) {
        // req will be a 'me' object,
        // which containing following info :
        // fb_id
        // fb_name
        // host_fb_id
        // stream_url
        console.log(req);
        var sendObj = new Object();
        var host_fb_id = req.host_fb_id;

        if(channels[host_fb_id].socket_id) {
            channels[host_fb_id].socket_id = socket.id;
            sendObj.ProductList = channels[host_fb_id].ProductList;
            sendObj.CurrentProduct = channels[host_fb_id].CurrentProduct;
            io.to(channels[host_fb_id].socket_id).emit('update_productlist', sendObj); // undefine.
            return;
        }
        var host = new Object();
        host.user = req;
        host.socket_id = socket.id;

        channels[host_fb_id].socket_id = socket.id;
        var customer = new Object();
        customer.user = req;
        customer.socket_id = socket.id;
        channels[host_fb_id].customers[host_fb_id] = customer;
        // Put host into customer list to recieve chat msg.
        //channels[host_fb_id].customers[host_fb_id] = host;
        sendObj.ProductList = channels[host_fb_id].ProductList;
        sendObj.CurrentProduct = 0;
        io.to(socket.id).emit('update_productlist', sendObj); // undefine.
    });

    socket.on('enter_channel', function(req) {
        // response will be a 'me' object.
        //console.log(req);
        var user_id = req.fb_id;
        var customer = new Object();
        var host_fb_id = req.host_fb_id;
        var sendObj = new Object();
        customer.user = req;
        customer.socket_id = socket.id;
        // put customer into channel's customers list.

        //channels[host_fb_id].customers[user_id] = customer;
        channels[host_fb_id].customers[socket.id] = customer;
        sendObj.CurrentProduct = 0;
        sendObj.ProductList = channels[host_fb_id].ProductList;

        io.to(socket.id).emit('update_productlist', sendObj);
    });

    socket.on('send_msg', function(req) {
        var host_fb_id = req.user.host_fb_id;
        var customers = channels[host_fb_id].customers;
        for (var key in customers) {
            //io.to(customers[key].socket_id).emit('broadcast_msg',req);
            io.to(key).emit('broadcast_msg', req);
        }
        io.to(channels[host_fb_id].socket_id).emit('broadcast_msg', req);
    });

    socket.on('customer_change_price', function(req) {
        var price_info = new Object();
        var host_fb_id = req.user.host_fb_id;
        var customers = channels[host_fb_id].customers;
        // get price and user info from req.
        price_info = req;
        channels[host_fb_id].PriceList[req.user.fb_id] = price_info;
        
        for (var key in customers) {
            io.to(key).emit('broadcast_customer_price',channels[host_fb_id].PriceList);
        }
        io.to(channels[host_fb_id].socket_id).emit('broadcast_customer_price', channels[host_fb_id].PriceList);
    });

    socket.on('host_change_price', function(req) {
        var host_fb_id = req.user.host_fb_id;
        var new_price  = req.new_price;
        var customers  = channels[host_fb_id].customers;
        var sendObj = new Object();

        if(channels[host_fb_id]) {
            var cur = channels[host_fb_id].CurrentProduct;
            channels[host_fb_id].ProductList[cur].price = new_price;
            sendObj.ProductList = channels[host_fb_id].ProductList;
            sendObj.CurrentProduct = channels[host_fb_id].CurrentProduct;

            for(var key in customers) {
                io.to(key).emit('broadcast_host_product', sendObj);
            }
            io.to(channels[host_fb_id].socket_id).emit('broadcast_host_product', sendObj);
        }
    });

    socket.on('select_product', function(req) {
        // need to be implemented
        var host_fb_id = req.user.host_fb_id;
        var customers;
        var orderlist;
        var sendObj = new Object();
        console.log('Select : ' + host_fb_id);
        if(channels[host_fb_id]) {
            channels[host_fb_id].CurrentProduct = req.new_pos;
            if(!channels[host_fb_id].ProductList[req.new_pos].order)
                channels[host_fb_id].ProductList[req.new_pos].order = new Object();

            customers = channels[host_fb_id].customers;
            orderlist = channels[host_fb_id].ProductList[req.new_pos].order;
            sendObj.CurrentProduct = req.new_pos;
            sendObj.host_fb_id = host_fb_id;
            for(var key in customers) {
                sendObj.order = orderlist[customers[key].user.fb_id];
                io.to(key).emit('broadcast_product_select', sendObj);
            }
        }

    });

    socket.on('host_confirm_order', function(req) {
        // collect all the data from web
    });

    socket.on('customer_disconnect', function(req) {
        var host_fb_id = req.user.host_fb_id;
        if(channels[host_fb_id].customers[socket.id]) {
            console.log('customer leave : ' + channels[host_fb_id].customers[socket.id].user.fb_id + ' '+ socket.id);
            delete channels[host_fb_id].customers[socket.id];
        }
    });

    socket.on('host_disconnect', function(req) {
        var host_fb_id = req.user.host_fb_id;
        if(channels[host_fb_id]) {
            var data = {
                        orderlist : JSON.stringify(channels[host_fb_id].ProductList),
                        };
            //data = JSON.stringify(data);
            request.post({url : db_url + 'placeorder/', form : data}, function(response) {
                // to do  :: retry if failed
                console.log(response);
                console.log('host finish : ' + host_fb_id);
            });
            delete channels[host_fb_id];
        }
    });

});

