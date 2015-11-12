function create_store () {
	// body...
	socket = io.connect('',{query: 'type=sale'});
	if(url==undefined){
		var url = prompt("URL?");
	}
	socket.emit('response_id_url',{'seller_fb_id':user_id,'youtube_url':url});
	socket.on('chat',function (user_id,talk) {
		// body...
		console.log(talk);
	});
}