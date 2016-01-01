var man_price_list = [];
function UpdateSellerProductList (response) {
    // body...
    //res.product_list
    fillProductListSlide(response);
}

function SelectProduct(position)
{
	//clear 
	var sendObj = new Object;
    sendObj.user = me;
    sendObj.new_pos = position;
    fillCurrentProductBlock(position);
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
    var wufa="";
    for(var key in response){
        wufa+="<input type=\"checkbox\" name=\"bit\" class=\"bit\" value=\""+response[key].price+"\" id=\""+response[key].user.fb_id+"\">"+response[key].user.ufb_name+": $"+response[key].price+"<br>"
    }
    $('#price-box').html(wufa);
}

function UpdateMessage(response) {

    response.user.name;
    var div = document.getElementById("msg-box");
    var msg_div = document.createElement("div");

    msg_div.className = "msg";
    msg_div.innerHTML = response.user.ufb_name + " : " + response.msg + "<br>";
    div.appendChild(msg_div);
    div.scrollTop = div.scrollHeight; // scroll to bottom

}

function UpdateProduct(response)
{
    var wufa =response.product.name;
    $('#productname').html(wufa);
}

function ChangePrice(price)
{
    var sendObj = new Object();
    sendObj.user = me;
    sendObj.new_price = price;
    socket.emit('host_change_price', sendObj);
}
