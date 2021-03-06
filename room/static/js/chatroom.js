var me = new Object();
var init_data = new Object();
me.guest = true;
me.ufb_name = 'Guest';

window.onbeforeunload = function (e) {
    Disconnect();
}


function initChatroom (name, id) {
    // body...
    console.log(name);
    console.log(id);

    if(id != -1) {
        var host_fb_id = window.location.href.split('hostfbid=')[1];
        me.host_fb_id = host_fb_id;
        me.ufb_name = name;
        me.fb_id = id;
        me.guest = false;
        $.ajax({
            url: './get_channel?hostfbid=' + host_fb_id,
            type: 'GET',
            success: function(response) {
            var stream_url = response.stream_url.split('youtu.be/')[1];
            $('#stream-frame').attr('src', 'http://www.youtube.com/embed/' + stream_url);
            init_data.CurrentProduct = response.CurrentProduct; 
            fillHostName(response.host_name);
            greetCustomer(response.host_name);
            enter_store();
            }
        });
    }
           
}
//buyer_send_message
function SendMessage(msg) {
    var sendObj = new Object();
    sendObj.user = me;
    sendObj.msg = msg;
    socket.emit('send_msg',sendObj);
}


function UpdateMessage(name, msg) {
    var msg_div = document.createElement("div");
    msg_div.className = "msg";
    msg_div.innerHTML = name + " : " + msg + "<br>";

    $('#msg-box').append(msg_div);
    $('#msg-box-wrapper')[0].scrollTop=$('#msg-box-wrapper')[0].scrollHeight*50;
}

//emit to 
function CustomerChangePrice(price)
{
    //change my on price
    var sendObj = new Object();
    sendObj.user = me;
    sendObj.price = price;
    console.log( sendObj);
    socket.emit('customer_change_price',sendObj);
}

function CustomerUpdatePrice(response,sort_user)
{
    //price list 
    console.log(sort_user);
    var output ="";
    for(var key in sort_user){
        output += "<div>"+response[sort_user[key]].user.ufb_name+" : "+response[sort_user[key]].price+"</div>"
    }
    $('#price-box').html(output);
}

function UpdateProduct(response)
{
    var wufa =response.product.name;
    $('#productname').html(wufa);
}

function UpdateProductList(response)
{
    fillProductListSlide(response);
}

function SelectProduct(response)
{
    console.log(response);
    fillCurrentProductBlock(response);
}

function OrderProduct()
{
    var sendObj = genOrderData(true);
    console.log(sendObj);
    socket.emit('change_customer_orderstatus', sendObj);
}

function CancelOrderProduct()
{
    var sendObj = genOrderData(false);
    socket.emit('change_customer_orderstatus', sendObj);
}

function genOrderData(order)
{
    var sendObj = new Object();
    sendObj.user = me;
    sendObj.order = order;
    console.log(sendObj);
    return sendObj;
}

function PostRequest(url, data, callback)
{
    $.post(url, data, function(response) {
        console.log(response);
    });
}

function Disconnect()
{
    var sendObj = new Object();
    sendObj.user = me;
    socket.emit('customer_disconnect', sendObj);
}

function BuyButtonReset (status)
{
    // defined in chatroom_front.js
    setBuyButtonStatus(status);
}

function greetCustomer(host_name)
{
    var msg = 
    {
        '1' : 'Hello，' + me.ufb_name + '！希望你能有個愉快的購物體驗！',
        '2' : '嘿，' + me.ufb_name + '！你來得正好！這商品你肯定有興趣！',
        '3' : me.ufb_name + '，你想要來一點新鮮的商品嗎？',
        '4' : me.ufb_name + '，I ain\'t got it, you don\'t want it !',
        '5' : '你好啊旅行者' + me.ufb_name + '，你看這個商品怎麼樣？'
     };
     var keys = Object.keys(msg);
     var rand_msg = msg[keys[ keys.length * Math.random() << 0]];
    UpdateMessage(host_name, rand_msg);
}
