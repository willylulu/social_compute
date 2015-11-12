$('#price_input').keypress(function(e){
if(e.keyCode==13)
    ChangePrice();
});




$('#msg_input').keypress(function(e){
if(e.keyCode==13)
    SendMessage(); 
});
