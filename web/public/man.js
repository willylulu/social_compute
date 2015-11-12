var socket;
function conversation () {
	// body...
	var talk = $('.talk').val();
	var fb_id = $('.fb_id').val();
	if(socket==undefined){
		alert("Please Identify your type.");
	}
	else{
		socket.emit('chat',fb_id,user_id,talk);
	}
}