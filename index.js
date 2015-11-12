var channels = new Object();
var people = new Object();
var carrer = new Object();
var buyer_queue = new Object();

var channel = function(seller_fb_id, youtube_url, socket_id) {
	this.youtube_url = youtube_url;
	this.seller_socket_id = socket_id;
	this.customers = [];
}
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
request = require('request');
var engines = require('consolidate');

server.listen(process.env.PORT||3000);
app.set('views', __dirname + 'views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/chatroom', function(req, res) {
	res.sendFile(__dirname + '/chatroom.html');
});
app.get('/chatcost',function (req,res) {
	// body...
	//var post = req.query;
	var data = require('url').parse(req.url,true).query;
	//console.log(data);
	res.render(__dirname +'/chatroom.html', data);
});
app.post('/', function(req, res) {
	// body...
	var body = '';
	req.on('data', function(data) {
		body += data;
	});
	var qr = require('querystring');
	var post;
	req.on('end', function() {
		post = qr.parse(body);
	    console.log(post['product[]']);	
	//	var update_url = 'http://tvsalestream.herokuapp.com/updatelive';
		var update_url = 'http://localhost:8000/updatelive/';
        var seller_id = post.seller_id;
		var products = post['product[]'];
        var product_list = new Object();
        var data = {
            'sellerid' : seller_id,
            'url'      : post.youtubeurl,
        };

        data = JSON.stringify(data);

        channels[seller_id] = new Object(); 
        channels[seller_id].product_list = product_list;
        channels[seller_id].product = new Object();

        console.log(products);
		for (var i = products.length - 1; i >= 0; i--) {
			var s = products[i].split('/');
			var id = s[0];
			var name = s[1];
			channels[seller_id].product_list[id] = name;
		}
        
		request.post({
            url:     update_url,
            body:    data,
        }, function(error, response, body){
            console.log(body);
        });


		
        res.render(__dirname +'/sale_man.html', post);
	});

});

io.sockets.on('connection', function(socket) {
	//console.log('type:' + socket.handshake.query.type);


	socket.on('response_add_seller', function(data) {
		// body...
		console.log('response_add_seller:'+data);
		var new_channel = new channel(data.id, data.url,socket.id);
		carrer[data.id]='chief';
		new_channel.customers.push(data);
		channels[data.id] = new_channel;
		var sendObj = new Object;
		sendObj.product_list = channels[data.id].product_list;
		console.log("update product list");
		console.log(sendObj.product_list);
		socket.emit('buyer_product_data',sendObj);
	});

	socket.on('response_buyer_id_seller_id', function(data) {
		// body...
		console.log('response_buyer_id_seller_id:'+data);
		var channel = channels[data.seller_id];
		carrer[data.id]='walker';
		channel.customers.push(data);
		console.log('url:' + channel.youtube_url);
		socket.emit('response_url', channels[data.seller_id].youtube_url);
	});

	socket.on('buyer_send_message', function (response) {
        var seller_id = response.user.seller_id;
		var customers  = channels[seller_id].customers;
		
        for (var key in dictionary) {
			io.to(customers[key]).emit('msg_broadcast', response);
		}
	});

    socket.on('buyer_change_price', function (response) {
        var seller_id = response.user.seller_id;
        var user_id   = response.user.id;
        var price = response.price;
		var customers  = channels[seller_id].customers;
	    response.customers = customers;	
        channels[seller_id].customers[user_id].price = price;
        response.customers.sort(function(a, b) {b.price - a.price});
        for (var key in customers) {
            io.to(customers[key]).emit('buyer_price_broadcast', response);
        } 
    });

    socket.on('seller_change_price', function (response) {
        var seller_id = response.user.seller_id;
		var customers  = channels[seller_id].customers;
    
        for (var key in customers) {
            io.to(customers[key]).emit('seller_price_broadcast', response);
        }
    });

    socket.on('seller_confirm_product_order', function(response){
        var seller_id = response.user.seller_id;
        var product_id = channels[seller_id].product.id;
        var product_name = channels[seller_id].product.name;
        var customers = response.customers;   
        var sendObj = new Object();

        sendObj.product_id = product_id;
        sendObj.product_name = product_name;
        sendObj.buyer_queue = customers;
 
	    request.post("localhost:8000/buyqueue", sendObj);

    }); 

    socket.on('select_product', function(response) {
        var seller_id = response.user.seller_id;
        var customers = channels[seller_id].customers;
        var product_id = response.product.id;
        var product_name = channels[seller_id].product_list[product_id];
        response.product.name = product_name;
        channels[seller_id].product.id = product_id;


        for (var key in customers) {
            io.to(customers[key]).emit('product_select_broadcast', response);
        }
    });

	socket.on('disconnect',function () {
		// body...
		console.log(people[socket.id]+" disconnect!");
	});
});

