$('#price_input').keypress(function(e){
if(e.keyCode==13){
    var price_input = document.getElementById("msg-input");
    var price = price_input.value;
    price_input.innerHTML = '';
    ChangePrice(price);
    }
});


$('#msg_input').keypress(function(e){
if(e.keyCode==13){
    var msg_input = document.getElementById("msg-input");
    var msg = msg_input.value;
    msg_input.innerHTML = '';
    SendMessage(msg);
    } 
});
