enter_store();

function PutMessage(name, msg) {

    var div = document.getElementById("msg-box");
    var msg_div = document.createElement("div");

    msg_div.className = "msg";
    msg_div.innerHTML = name + " : " + msg + "<br>";
    div.appendChild(msg_div);
    div.scrollTop = div.scrollHeight; // scroll to bottom

}
function SendMessage(my_id) {
    var msg_input = document.getElementById("msg-input");
    var msg = msg_input.value;
    msg_input.innerHTML = '';
    socket.emit('chat',user_id,my_id,msg);
}

