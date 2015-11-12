var socket;
function enter_store () {
	// body...
	socket = io.connect('',{query: 'type=buy'});
	socket.emit('response_buyer_id_seller_id',me);
	socket.on('response_url',function (url) {
		// body...
		console.log(url);
	});
	socket.on('msg_broadcast',function (response) {
		// body...
	UpdateMessage(response);
	});
	socket.on('buyer_price_broadcast',function (response) {

		UpdatePrice(response);
	});
	socket.on('seller_price_broadcast',function (response) {

		UpdateSellerPrice(response);
	});
	socket.on('product_select_broadcast',function (response) {

		UpdateProduct(response);
	});
}