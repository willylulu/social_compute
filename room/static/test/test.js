exports.fake_channel = function() {
	// body...
	var product_list = new Object();
	var channels = new Object();
	channels.product_list = product_list;
	channels.product = new Object();
	for (var i = 0; i < Math.floor((Math.random() * 10) + 1); i++) {
		var id  = Math.floor((Math.random() * 100) + 50);
		var name  = Math.floor((Math.random() * 100) + 50);
		channels.product_list[id] = name;
	};
	return channels;
}
exports.fake_id = function() {
	// body...
	return Math.floor((Math.random() * 100) + 50);
}
