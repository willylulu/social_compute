var socket = io.connect('',{query: 'type=sale'});
socket.emit('response_id_url',{'seller_fb_id':user_id,'youtube_url':url});
function PutMessage(name, msg) {

    var div = document.getElementById("msg-box");
    var msg_div = document.createElement("div");

    msg_div.className = "msg";
    msg_div.innerHTML = name + " : " + msg + "<br>";
    div.appendChild(msg_div);
    div.scrollTop = div.scrollHeight; // scroll to bottom

}
function SendMessage(user_id) {
    var msg_input = document.getElementById("msg-input");
    var msg = msg_input.value;
    msg_input.innerHTML = '';
    socket.emit('chat',seller_id,user_id,msg);
}
socket.on('chat',function (sender_id,talk) {
        // body...
        PutMessage(sender_id,talk);
});
