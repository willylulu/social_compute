$('#price_input').keypress(function(e){
    if(e.keyCode==13){
        var price_input = document.getElementById("msg-input");
        var price = price_input.value;
        price_input.innerHTML = '';
        CustomerChangePrice(price);
    }
});


$('#price-send-btn').click(function()
{
    var price = $('#price-input').val();
    $('#price-input').val('');
    CustomerChangePrice(price);
});



$('#msg-send-btn').click(function()
{
	var msg = $('#msg-input').val();
        console.log(msg);
        $('#msg-input').val('');
         SendMessage(msg);
});




$('#msg_input').keypress(function(e){
if(e.keyCode==13){
    var msg_input = document.getElementById("msg-input");
    var msg = msg_input.value;
    msg_input.innerHTML = '';
    SendMessage(msg);
    } 
});
