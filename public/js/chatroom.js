enter_store();

//buyer_send_message
function SendMessage(msg) {

    var sendObj = new Object;
    sendObj.user = me;
    sendObj.msg = msg;

    socket.emit('buyer_send_message',sendObj);
}


function UpdateMessage(response) {

    response.user.name;
    var div = document.getElementById("msg-box");
    var msg_div = document.createElement("div");

    msg_div.className = "msg";
    msg_div.innerHTML = response.user.name + " : " + response.msg + "<br>";
    div.appendChild(msg_div);
    div.scrollTop = div.scrollHeight; // scroll to bottom

}



//emit to 
function ChangePrice(price)
{
    //change my on price
    var sendObj = new Object;
    sendObj.user = me;
    sendObj.price = price;

    socket.emit('buyer_change_price',sendObj);
}

function UpdatePrice(response)
{
    //price list 
    response.user.name;
    response.price
}

function UpdateSellerPrice(response)
{
    //price list 
    response.user.name;
    response.price = 
}

function UpdateProduct(response)
{
    response.product.name;
    

}




