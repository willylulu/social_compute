$('#price_input').keypress(function(e) {
	if (e.keyCode == 13) {
		var price = $('#price-input').val();
		SellerChangePrice(price);
	}

});


$('#msg-send-btn').click(function()
{
	var msg = $('#msg-input').val();
        console.log(msg);
        $('#msg-input').val('');
         SendMessage(msg);
});




$('#msg-input').keypress(function(e){
if(e.keyCode==13){
    var msg_input = document.getElementById("msg-input");
    var msg = msg_input.value;
    $('#msg-input').val('');
    SendMessage(msg);
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
});
