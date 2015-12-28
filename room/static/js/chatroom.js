var me = new Object();
var init_data = new Object();

function FBinitCallback () {
    // body...
    FB.api('/me',function(res){
            var host_fb_id = window.location.href.split('hostfbid=')[1];
            console.log(res);
            me.host_fb_id = host_fb_id;
            me.ufb_name = res.name;
            me.fb_id = res.id;

            $.ajax({
                url: 'http://localhost:3000/get_channel?hostfbid=' + host_fb_id,
                type: 'GET',
                success: function(response) {
                var stream_url = response.stream_url.split('youtu.be/')[1];
                $('#stream-frame').attr('src', 'http://www.youtube.com/embed/' + stream_url);
                init_data.CurrentProduct = response.CurrentProduct; 
                fillHostName(response.host_name);
                enter_store();
                }
                });
            //me.stream_url = res.stream_url;
            //enter_store();
           
    });
}
//buyer_send_message
function SendMessage(msg) {
    console.log(msg);
    var sendObj = new Object();
    sendObj.user = me;
    sendObj.msg = msg;
    socket.emit('send_msg',sendObj);
}


function UpdateMessage(response) {
    console.log(response);
    var div = document.getElementById("msg-box");
    var msg_div = document.createElement("div");

    msg_div.className = "msg";
    msg_div.innerHTML = response.user.ufb_name + " : " + response.msg + "<br>";
    div.appendChild(msg_div);
    div.scrollTop = div.scrollHeight; // scroll to bottom

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

function CustomerUpdatePrice(response)
{
    //price list 
    console.log(response);
    var output ="";
    for(var key in response){
        output += "<div>"+response[key].user.ufb_name+" : "+response[key].price+"</div>"
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
    fillProductListSlide(response.ProductList);
}

function SelectProduct(response)
{
    fillCurrentProductBlock(response);
}
