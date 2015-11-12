function enter_store () {
	// body...
	socket = io.connect('',{query: 'type=buy'});
	socket.emit('response_fb_id_my_id',my_id,user_id);
	socket.on('response_url',function (url) {
		// body...
		alert(url);
	});
	socket.on('chat',function (user_id,talk) {
		// body...
		console.log(talk);

		PutMessage(user_id.replace(/\%20/g," "), talk);
	});
}