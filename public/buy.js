function enter_store () {
	// body...
	socket = io.connect('',{query: 'type=buy'});
	socket.emit('response_buyer_id_seller_id',me);
	socket.on('response_url',function (url) {
		// body...
		console.log(url);
	});
	socket.on('chat',function (user_id,msg) {
		// body...
		console.log(msg);

		UpdateMessage(user_id.replace(/\%20/g," "),msg);
	});
}