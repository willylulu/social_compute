function enter_store () {
	// body...
	var fb_id = $('.fb_id').val();
	console.log(fb_id);
	socket = io.connect('',{query: 'type=buy'});
	socket.emit('response_fb_id_my_id',fb_id);
	socket.on('response_url',function (url) {
		// body...
		console.log("response_url");
		var container_text = $('.container').html();
		container_text+="<div>"+url+"</div>";
		$('.container').html(container_text);
	});
	socket.on('chat',function (user_id,talk) {
		// body...
		console.log(talk);
	});
}