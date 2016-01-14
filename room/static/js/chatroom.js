var me = new Object();
var init_data = new Object();
me.guest = true;
me.ufb_name = 'Guest';

window.onbeforeunload = function (e) {
    Disconnect();
}


function FBinitCallback () {
    // body...
    FB.api('/me',function(res){
            var host_fb_id = window.location.href.split('hostfbid=')[1];
            console.log(res);
            me.host_fb_id = host_fb_id;
            me.ufb_name = res.name;
            me.fb_id = res.id;
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
            //me.stream_url = res.stream_url;
            //enter_store();
           
    });
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
    var msg = 'Hello，' + me.ufb_name + '！希望你能有個愉快的購物體驗！'; 
    UpdateMessage(host_name, msg);
}
