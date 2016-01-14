var man_price_list = [];


$(window).on('beforeunload', function (e) {
    var msg = "離開這個頁面將導致頻道關閉，您確定要離開嗎?(注意：hangout直播在關閉視窗後仍會繼續執行，請在hangout中停止直播)";
    return msg;
});


$(window).unload(function() {
    // disconnect when user confirmed to leace
    Disconnect();
});


function SendMessage(msg) {
    var sendObj = new Object();
    sendObj.user = me;
    sendObj.msg = msg;
    socket.emit('send_msg',sendObj);
}


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
function UpdatePrice(response,sort_user)
{
    //price list 
    var wufa="";
    for(var key in sort_user){
        wufa+="<input type=\"checkbox\" name=\"bit\" class=\"msg\" value=\""+response[sort_user[key]].price+"\" id=\""+response[sort_user[key]].user.fb_id+"\">"+response[sort_user[key]].user.ufb_name+": $"+response[sort_user[key]].price+"<br>";
    }
    if ($('#videoblock').css('display') == 'none'){ 
        $('.msg').css('font-size','30px');
    }
    else {
        $('.msg').css('font-size','16px');
    }
    $('#price-box').html(wufa);
}

function UpdateMessage(name, msg) {
    var msg_div = document.createElement("div");
    msg_div.className = "msg";
    msg_div.innerHTML = name + " : " + msg + "<br>";
    $('#msg-box').append(msg_div);

    /* resize if host hide webcam */
    if ($('#videoblock').css('display') == 'none'){ 
        $('.msg').css('font-size','30px');
    }
    else {
        $('.msg').css('font-size','16px');
    }


    $('#msg-box-wrapper')[0].scrollTop=$('#msg-box-wrapper')[0].scrollHeight*50;
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

function Disconnect()
{
    var sendObj = new Object();
    sendObj.user = me;
    socket.emit('host_disconnect', sendObj);
}

function UpdateOrderStatus(new_order, num)
{
    // new_order : true if someone has order it, false if someone has cancel it.
    // num       : current number of order
    // Do something with these two data.
    $('#currentordernum').text(num);
    console.log(new_order);
    console.log(num);
}

Object.size = function(obj){
    var size = 0, key;
    for (key in obj){
        if(obj.hasOwnProperty(key))size ++;
    }
    return size;
}

function CustomerEnter(newcustomer, length){
    var name = newcustomer.ufb_name;
    
}
