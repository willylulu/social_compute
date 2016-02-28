const express    = require('express'),
      app        = express(),
      server     = require('http').createServer(app),
      io         = require('socket.io').listen(server),
      engines    = require('consolidate'),
      request    = require('request'),
      room_route = __dirname + '/room/templates/',
      channels   = new Object();

//  share channel data to all backend port
module.exports.app      = app;
module.exports.engine   = engines;
module.exports.request  = request;
module.exports.express  = express;
module.exports.channels = channels;

// start web mapping
require('./web.js');
require('./database/models/Product.js');
require('./database/models/User.js');
require('./database/models/BuyQueue.js');


// server on 3000
server.listen(process.env.PORT || 3000);
app.engine('html', engines.mustache);
app.set('view engine', 'html');
app.set('views', __dirname + 'views');
app.use(express.static(__dirname));

var db_url = 'http://tvsalestream.herokuapp.com/';

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
    var hostfbid = req.query.hostfbid;
    var stream_url = req.query.stream_url;
    var name = 'guest', id = -1;
    if(!hostfbid) {
        res.sendStatus(404);
        return;        
    }

    if(req.user) {
        id   = req.user._json.id;
        name = req.user._json.name;
    }

    res.render(room_route + 'chatroom.html',{'accountname': name,'uid': id});
});

app.get('/hostroom', function(req, res) {
    try {
        var id = req.user._json.id;
        if(!channels[id])
            throw ReferenceError;

        res.render(room_route + 'hostroom.html', {'host_fb_id' : id});
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
});

// not sure why lulu keep this.
app.get('/chatroom_lulu', function(req, res) {
    res.sendFile(room_route + 'chatroom_lulu.html');
});

app.get('/get_channel', function(req, res) {
    try {
        var hostfbid = req.query.hostfbid;
        if(!channels[hostfbid])
            throw ReferenceError;
        res.send(channels[hostfbid]);
    } catch (err) {
        console.log(err);
        res.sendStatus(404);
    }
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
        var data        = JSON.parse(body);
        var host_fb_id  = data.hostfbid; // use fb id as identifier  
        var ProductList = data.productlist;
        var streamurl   = data.streamurl; 
        var host_name   = data.hostname;      
        var channel     = new Object();
        // put basic info into target channel.
        // other info such as stream url and socket id
        // will be init when create_channel socket catch data.
        channel                 = new Object();
        channel.PriceList       = new Object();
        channel.customers       = new Object();
        channel.customer_length = 0; 
        channel.CurrentProduct  = 0;
        channel.stream_url      = streamurl;
        channel.host_name       = host_name;   
        channel.ProductList     = ProductList;
        channels[host_fb_id]    = channel;

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

        var host_fb_id = req.host_fb_id;
        var channel    = channels[host_fb_id];
        var host       = new Object();
        var sendObj    = new Object();

        if(!host_fb_id)
            return;

        if(!(channel.socket_id)) {
            host.user                    = req;
            host.socket_id               = socket.id;
            channel.socket_id            = socket.id;
            channel.customers[socket.id] = host;
        }

        // Put host into customer list to recieve chat msg.
        sendObj.ProductList    = channel.ProductList;
        sendObj.CurrentProduct = channel.CurrentProduct;
        io.to(socket.id).emit('update_productlist', sendObj); // undefine.
    });

    socket.on('enter_channel', function(req) {
        // response will be a 'me' object.
        var user_id    = req.fb_id;
        var host_fb_id = req.host_fb_id;
        var channel    = channels[host_fb_id];
        var customer   = new Object();
        var sendObj    = new Object();
        var announce   = new Object();

        if(!channel)
            return;

        customer.user      = req;
        customer.socket_id = socket.id;

        // put customer into channel's customers list.
        sendObj.ProductList          = channel.ProductList;
        sendObj.CurrentProduct       = channel.CurrentProduct;
        channel.customers[socket.id] = customer;
        channel.customer_length ++;


        announce.new_customer    = req;
        announce.customer_length = channel.customer_length;

        io.to(socket.id).emit('update_productlist', sendObj);
        io.to(channel.socket_id).emit('customer_enter', announce);
    });

    socket.on('send_msg', function(req) {
        console.log(req);
        var host_fb_id = req.user.host_fb_id;
        var channel    = channels[host_fb_id];
        var customers;

        if(!channel)
            return;

        customers = channel.customers;

        // If its host, add host name to it
        if(socket.id === channel.socket_id)
            req.user.ufb_name = channel.host_name;

        for (var key in customers) {
            io.to(key).emit('broadcast_msg', req);
        }
    });

    socket.on('customer_change_price', function(req) {
        var host_fb_id = req.user.host_fb_id;
        var channel    = channels[host_fb_id];
        var sort_user  = [];
        var price_info = new Object();
        var customers;

        if(!channel)
            return;

        // get price and user info from req.
        price_info       = req;
        price_info.price = parseInt(price_info.price);
        customers        = channel.customers;
        channel.PriceList[req.user.fb_id] = price_info;

        // sort user by price.
        sort_user = Object.keys(channel.PriceList);
        sort_user.sort(function (a, b) {
            return channel.PriceList[b].price - channel.PriceList[a].price;
        });
        
        for (var key in customers) {
            io.to(key).emit('broadcast_customer_price', channel.PriceList, sort_user);
        }
    });

    socket.on('host_change_price', function(req) {
        var host_fb_id = req.user.host_fb_id;
        var new_price  = req.new_price;
        var channel    = channels[host_fb_id];
        var sendObj    = new Object();
        var customer;
        var cur;

        if(!channel)
            return;

        cur       = channel.CurrentProduct;
        customers = channel.customers;
            
        channel.ProductList[cur].price = new_price;
        sendObj.ProductList            = channel.ProductList;
        sendObj.CurrentProduct         = channel.CurrentProduct;

        for(var key in customers) {
            io.to(key).emit('broadcast_host_product', sendObj);
        }
    });

    socket.on('select_product', function(req) {
        // need to be implemented
        var host_fb_id  = req.user.host_fb_id;
        var channel     = channels[host_fb_id];
        var sendObj     = new Object();
        var changeOrder = new Object();
        var customers;
        var orderlist;
        var cur;

        console.log('Select : ' + host_fb_id);

        if(!channel)
            return;

        channel.CurrentProduct = req.new_pos;
        cur                    = channel.CurrentProduct;

        if(!channel.ProductList[cur].order) {
            channel.ProductList[cur].order = new Object();
            channel.ProductList[cur].order_length = 0;
        }

        customers              = channel.customers;
        orderlist              = channel.ProductList[cur].order;
        sendObj.CurrentProduct = cur;
        sendObj.host_fb_id     = host_fb_id;

        for(var key in customers) {
            sendObj.order = orderlist[customers[key].user.fb_id];
            io.to(key).emit('broadcast_product_select', sendObj);
        }
        
        changeOrder.newOrder     = false;
        changeOrder.order_length = channel.ProductList[cur].order_length;
        // only need to tell host that order status has change.
        io.to(channel.socket_id).emit('change_host_orderstatus', changeOrder);
    });

    socket.on('host_confirm_order', function(req) {
        // collect all the data from web
    });

    socket.on('customer_disconnect', function(req) {
        var host_fb_id = req.user.host_fb_id;
        var channel    = channels[host_fb_id];
        if(channel.customers[socket.id]) {
            console.log('customer leave : ' + channel.customers[socket.id].user.fb_id + ' '+ socket.id);
            delete channel.customers[socket.id];
            channel.customer_length --;
        }
    });

    socket.on('host_disconnect', function(req) {
        var host_fb_id = req.user.host_fb_id;
        var channel    = channels[host_fb_id];

        if(!channel)
            return;

        var data = {
            owner     : host_fb_id,
            orderlist : JSON.stringify(channels[host_fb_id].ProductList),
        };
        
        request.post({ 
            url : db_url + 'placeorder/', 
            form : data
        }, function (response) {
                // to do  :: retry if failed
                console.log(response);
                console.log('host finish : ' + host_fb_id);
        });
        delete channel;
    });

    socket.on('change_customer_orderstatus', function(req) {
        var uid        = req.user.fb_id;
        var order      = req.order;
        var host_fb_id = req.user.host_fb_id;
        var channel    = channels[host_fb_id];
        var sendObj    = new Object();
        var cur;
        var cur_product;

        if(!channel) 
            return;

        cur         = channel.CurrentProduct;
        cur_product = channel.ProductList[cur];

        if(!order && cur_product.order[uid]) {
            // custmoer want to cancel order.
            delete cur_product.order[uid];

            if(cur_product.order_length > 0)
                cur_product.order_length--;

            console.log('cancel order success (' + uid + ') : ' + cur_product.productname);

        } else if(order && !cur_product.order[uid]) {
            // customer want to order it.
            cur_product.order[uid] = true;
            cur_product.order_length ++;

            console.log('order success (' + uid + ') : ' + cur_product.productname);
        } else if(order) {
            console.log('already order (' + uid + ') : ' + cur_product.productname);
            return;
        } else {            
            console.log('Cannot cancel because you have not ordered it');
            return;
        }

        sendObj.newOrder     = order;
        sendObj.order_length = cur_product.order_length;
        // only need to tell host that order status has change.
        io.to(channel.socket_id).emit('change_host_orderstatus', sendObj);
    });

});

