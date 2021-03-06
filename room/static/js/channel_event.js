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
		UpdateMessage(response.user.ufb_name, response.msg);
	});

	socket.on('broadcast_customer_price',function (response,sort_user) {
		CustomerUpdatePrice(response,sort_user);
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
		UpdateMessage(response.user.ufb_name, response.msg);
	});
	socket.on('broadcast_customer_price',function (response,sort_user) {
		UpdatePrice(response,sort_user);
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

	socket.on('change_host_orderstatus', function (response) {
		console.log(response);
		// UpdateOrderStatus is in hostroom.js, someone have to implement it
		// to do corresponding UI action.
		UpdateOrderStatus(response.newOrder, response.order_length);
	});

	socket.on('customer_enter', function(response) {
		console.log(response);
		CustomerEnter(response.new_customer, response.customer_length);
	});
}
