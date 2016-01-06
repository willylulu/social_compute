var socket;
function getsession(){
	$.get('',function(res) {
		
	});
}
function enter_store () {
	// body...
	//init_data.host_fb_id = 
	socket = io.connect('',{query: 'type=buy'});
	me.socket_id = socket.id;

	socket.emit('enter_channel',me);

	socket.on('broadcast_msg',function (response) {
		UpdateMessage(response);
	});

	socket.on('broadcast_customer_price',function (response) {
		CustomerUpdatePrice(response);
	});

	socket.on('broadcast_host_product',function (response) {
		UpdateProductList(response.ProductList);
	});

	socket.on('broadcast_product_select', function(response) {
		SelectProduct(response.CurrentProduct);
		BuyButtonReset(response.order);
	});

	socket.on('update_productlist', function (response) {
        UpdateProductList(response.ProductList);
        SelectProduct(response.CurrentProduct);
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

	socket.on('broadcast_host_product', function(response) {
		UpdateSellerProductList(response.ProductList);
		SelectProduct(response.CurrentProduct);
	});

	socket.on('update_productlist', function (response) {
		console.log(response);
		UpdateSellerProductList(response.ProductList);
		SelectProduct(response.CurrentProduct);
	});
}
