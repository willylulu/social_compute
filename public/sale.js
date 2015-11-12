function create_store () {
	// body...
	socket = io.connect('',{query: 'type=sale'});
	socket.emit('response_add_seller',me);
	socket.on('chat',function (user_id,talk) {
		// body...
		console.log(talk);
		PutMessage(user_id.replace(/\%20/g," "), talk);
	});
}