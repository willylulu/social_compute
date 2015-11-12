var man_price_list = [];

function SelectProduct(product_id)
{
	//clear 
	var sendObj = new Object;
    sendObj.user = me;
    sendObj.product = new Object;
    sendObj.product.id = product_id;

	socket.emit('select_product',sendObj);
}


function SellerChangePrice(price)
{
    //change my on price
    var sendObj = new Object;
    sendObj.user = me;
    sendObj.price = price;
    socket.emit('seller_change_price',sendObj);
    
}



function SellerConfirmProductOrder(customers)
{
	var sendObj = new Object;
	sendObj.customers = customers;
	socket.emit('seller_confirm_product_order',sendObj);
}
function UpdatePrice(response)
{
    //price list 
    var customers = response.customers;
    var wufa="";
    for(var key in customers){
        wufa+="<input type=\"checkbox\" name=\"bit\" class=\"bit\" value=\""+price+"\">"+"ID: "+man_price_list[i].id+" Price: "+man_price_list[i].price+"<br>"
    }
    $('#price-box').html(wufa);
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
function UpdateProduct(response)
{
    var wufa =response.product.name;
    $('#productname').html(wufa);
}