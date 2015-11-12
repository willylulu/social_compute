$('#price_input').keypress(function(e) {
	if (e.keyCode == 13) {
		var price = $('#price-input').val();
		SellerChangePrice(price);
	}

});
$("#send").click(function() {
	// body...
	var price = $('#price-input').val();
	SellerChangePrice(price);
});
$('#confirm-order-btn').click(function() {
		var check_list = [];
		$('input:checkbox[name=CheckBoxCities][checked=true]').each(function() {
			var check = new Object;
			check.price = $(this).val();
			check.id = $(this).attr("id");
			check_list.push(check);
		});
	)
};
