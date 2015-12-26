var socket;
function enter_store () {
	// body...
	socket = io.connect('',{query: 'type=buy'});
	me.socket_id = socket.id;

	socket.emit('enter_channel',me);

	socket.on('msg_broadcast',function (response) {
		UpdateMessage(response);
	});

	socket.on('broadcast_customer_price',function (response) {
		CustomerUpdatePrice(response);
	});

	socket.on('broadcast_host_product',function (response) {
		UpdateProduct(response);
	});
}

function create_channel () {
	// body...
	socket = io.connect('',{query: 'type=sale'});


	socket.emit('create_channel', me);
	// listen on target socket
	socket.on('broadcast_msg',function (response) {
		// body...
		UpdateMessage(response);
	});
	socket.on('broadcast_customer_price',function (response) {
		UpdatePrice(response);
	});

	socket.on('update_productlist', function (response) {
		UpdateSellerProductList(response);
	});
}
