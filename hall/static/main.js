var userproductlist = {};
var ptr = 0;//modify

var bound = productlist.length; //modify
var FB_init_is_done = false;
var front_end_url = './';
var socket_url = './create_channel';
var me;
function load_productlist () {
    // body...
    for (var i = 0; i < productlist.length; i++) {
        var product_for_sale = document.createElement('div');
        product_for_sale.id = "product"+i;
        product_for_sale.className = "product_list";
        $("#product_sales").append(product_for_sale);
        $("#product"+i).attr('style',"display:inline-block;");
        $("#product"+i).html("<h4>"+productlist[i].fields.name+"</h4><h5>"+productlist[i].fields.price+"</h5><h5>"+productlist[i].fields.ownername+"</h5>");  
    };
}

/* jQuery Handle event block */
function triggerHotStreamBtn(){
    $('.hotstreambtn').click(function(){
        var hostid = $(this).data('hostid');
        fillStreamViewModal(hostid);
        $('#streamviewpop').modal('show');
    });
}



/* jQuery Handle end */




function my_productlist (list) {
    // body...
    for (var i = 0; i < list.length; i++) {
        var my_product_for_sale = document.createElement('div');
        $("#my_product_for_sale").append(my_product_for_sale);
        var input = document.createElement('input');
        my_product_for_sale.appendChild(input);
        input.setAttribute("type",'checkbox');
        input.setAttribute('name','my_product');
        input.setAttribute('data-product',list[i].fields.name);
        input.setAttribute('value',list[i].pk);
        var temp = document.createElement('span');
        my_product_for_sale.appendChild(temp);
        var t = document.createTextNode(list[i].fields.name+" $"+list[i].fields.price);
       temp.appendChild(t);
    };
}

function createGlobalProductList(list){

    for (var e in list){
        var name = list[e].fields.name;
        var price = list[e].fields.price;
        var description = list[e].fields.description;
        var product = {};
        product['price'] = price;
        product['description'] = description;
        userproductlist[name] = product;
    }
}

function FBinitCallback () {
    // body...
    if(me!=undefined&&me.status=='connected'){
        FB.api('/me',function(res){
            $.post(check_url,{'user':res.name,'uid':res.id},function() {
                accountname=res.name;
                uid  = res.id;
                $("#username").html("Hi,"+res.name);
                $("#sale_username").html("Hi,"+res.name);
                $("#FB_Login").hide();
                $.post('/checklogin',{'uid':res.id},function(req,response) {
                    my_productlist(req);
                    createGlobalProductList(req);
                });
            });
        });
    }
}

/*
function load_channels () {
    // body...

     var onlive_forloop_counter=1;
    for (var key in onlive_Channel) {
        if(key=='undefined')continue;
        var onlive_obj1 = document.createElement('div');
        $(".hotstreamcontainer").append(onlive_obj1);
            var PopStream = document.createElement('a');
            PopStream.id = 'PopStream';
            PopStream.className = "PopStream";
            onlive_obj1.appendChild(PopStream);
            PopStream.setAttribute('data-toggle','modal');
            PopStream.setAttribute('data-target','#streamviewpop'+onlive_forloop_counter);
            PopStream.setAttribute('style','padding:1.3vw;');
                var objh = document.createElement('h3');
                PopStream.appendChild(objh);
                    var t = document.createTextNode(onlive_Channel[key].host_name);
                    objh.appendChild(t);

        var onlive_obj2 = document.createElement('div');
        onlive_obj2.id = 'streamviewpop'+onlive_forloop_counter;
        onlive_obj2.className = "modal fade";
        $(".hotstreamcontainer").append(onlive_obj2);
            var dialog = document.createElement('div'); 
            dialog.className = "modal-dialog";
            onlive_obj2.appendChild(dialog);
                var content = document.createElement('div');  
                content.className = "modal-content";
                dialog.appendChild(content);
                    var header = document.createElement('div');
                    header.className = "modal-header";
                    content.appendChild(header);
                        var button = document.createElement('button');
                        header.appendChild(button);
                        var h4 = document.createElement('div');
                        h4.className = "modal-title";
                        header.appendChild(h4);
                            var t3 = document.createTextNode("Hi, Welcome to "+onlive_Channel[key].host_name+"'s stream");
                            h4.appendChild(t3);
                        button.setAttribute('class','close');
                        button.setAttribute('data-dismiss','modal');
                            var t2 = document.createTextNode('Close');
                            button.appendChild(t2);
                    var body = document.createElement('div');
                    body.className = "modal-body";
                    content.appendChild(body);
                    body.setAttribute('style',"display:inline-block");
                    var footer = document.createElement('div');
                    footer.className = "modal-footer";
                    content.appendChild(footer);
                        var button2 = document.createElement('button');
                        button2.className = "btn btn-default";
                        footer.appendChild(button2);
                        button2.setAttribute('type','button');
                        button2.setAttribute('data-dismiss','modal');
                        button2.setAttribute('onClick','enterChannel('+key+')');
                            var t4 = document.createTextNode("Go!");
                            button2.appendChild(t4);
        
         onlive_forloop_counter++;
    }
}*/

function load_channels(){
    for (var key in onlive_Channel){
        if ( key =='undefined'){
            continue;
        }
        else{
            var append = generateHotStreamAppend(key);
            $('.hotstreamcontainer').append(append);
        }
    }
    triggerHotStreamBtn();
}

Object.size = function(obj){
    var size = 0, key;
    for (key in obj){
        if(obj.hasOwnProperty(key))size ++;
    }
    return size;
}

// create by Frank 12/28 
function generateHotStreamAppend(position){
    
    var name = onlive_Channel[position]['host_name'];
    var number = Object.size(onlive_Channel[position]['customers']);
    var profile = '';
    var append = '  <div class="hotstreamblock">'+
                        '<div class="hotstreamhost">'+name+'</div>'+
                        '<div class="hotstreamprofile">'+profile+'</div>'+
                        '<div class="hotstreamnumber"><i class="fa fa-user">'+number+'</i></div>'+
                        '<div class="hotstreambtn" data-hostid="'+position+'">Check it out!</div>'+
                    '</div>'
    return append
}

function fillStreamViewModal(position){
    clearStreamViewModal();

    var name = onlive_Channel[position]['host_name'];
    var hostproducts = onlive_Channel[position]['ProductList'];
    var streamurl = onlive_Channel[position]['stream_url'];

    var appendname = '前往 ' +name+' 的頻道';
    var appendproduct = '';    // TODO
    $('.streamviewpoptitle').append(appendname);
    $('#gostreambtn').attr('onclick',"enterChannel('"+position+"')");
}

function clearStreamViewModal(){
    $('.streamviewpoptitle').empty();
    $('.streamviewpopbody').empty();
}

function enterChannel (host_fb_id) {
    // body...
     window.location ='chatroom?hostfbid='+host_fb_id;

}
window.onload = function (){
     draw();
    //add
    load_productlist();
    load_channels();
     
    $('.product_list').hide();

    $('#secTitle').css("color","rgba(255,255,255,0.5)");

    var i ;
    for ( i = ptr ; i < ptr +3 ; i++){ 
    name = makeName(i);
     $(name).show();
    }
     checkBound();
}


function previous(){
 var i;
 
 $('.product_list').hide();
 ptr = ptr -3 ;
 checkBound();
 
for( i = ptr ; i < ptr + 3 ; i ++){
 $(makeName(i)).show();
}
}


function next(){
 
 $('.product_list').hide();
 ptr = ptr +3 ;
 checkBound();
 var i ;
 for ( i = ptr ; i < ptr+3; i++)
 {
 $(makeName(i)).show();
}
}


function makeName(count){

	return '#product' + count;

}
function checkBound(){
	
	if(bound == 0 ){
	$('#next_btn').hide();
	$('#pre_btn').hide();
	$('#bool_product').hide();
	return; 
	}
	
	if (ptr == bound || ptr + 3 >= bound){ //modify
		$('#next_btn').hide();
	}
	else{
	       $('#next_btn').show();
	}

	if(ptr == 0){  //modify
		$('#pre_btn').hide();
	}
	else{
		$('#pre_btn').show();
	}
}


$("#username").mouseover(function(){
	$('#page-top').append("<div id='cover' style='position:absolute;top:0;left:0;width:98.7vw;height:95vh;background-color:rgba(0,0,0,0.5);'>");
	$(this).attr('z-index',"1000");

});

$("#username").mouseout(function(){
   $('#cover').remove();
    $(this).attr('z-index','1');
    
});

$("#username").click(function(){ 
    window.location.href="./logout"
});


function draw(){
 
var ctx = document.getElementById("draw_title").getContext("2d");
var c = document.getElementById("draw_title");
dashLen = 220;
dashOffset = dashLen;
speed = 10;
txt = "  LiveStream Sale";
x = 0 ; i = 0 ;
ctx.clearRect(x, 0, c.getAttribute("width"), c.getAttribute("height"));
ctx.font = "75px Lora,'Helvetica Neue',Helvetica,Arial,sans-serif";
ctx.lineJoin = "round";
//ctx.globalAlpha = 2/3;
ctx.strokeStyle = ctx.fillStyle = "#FFF";

	(function loop(){


	ctx.setLineDash([dashLen - dashOffset, dashOffset -speed]);
	dashOffset -= speed;
	ctx.strokeText(txt[i],x,90);
	if(dashOffset > 0) requestAnimationFrame(loop);
	else{
	
	ctx.fillText(txt[i],x,90);
	dashOffset = dashLen;
	x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
	ctx.setTransform(1,0,0,1,0,3 * Math.random());
	ctx.rotate(Math.random() * 0.005);

	if ( i < txt.length) requestAnimationFrame(loop);
    
	}
	})();
	 
     setTimeout(draw,10000);
    
}

function addproduct(){
	window.location.href = '/addproduct';
}


function create(){
    
        $('#openstream').modal('hide'); 
}

function openhost(){

    console.log(userproductlist);

    var posturl = socket_url;
    var host_name = accountname;
    var host_fb_id = uid;
    var stream_url = $('#youtubeurl').val();
    var productlist = [];
    $("input[name='my_product']:checked").each(function(){
        var checkproduct = {};
        var name = $(this).data('product');
        checkproduct['pid'] = $(this).val();
        checkproduct['productname'] = name;
        checkproduct['price'] = userproductlist[name]['price'];
        checkproduct['description'] = userproductlist[name]['description'];
        productlist.push(checkproduct);
    });
    data = {};
    data['hostname'] = host_name;
    data['hostfbid'] = host_fb_id;
    data['streamurl'] = stream_url;
    data['productlist'] = productlist;
//    console.log(productlist);
 /* 
   var xhr = new XMLHttpRequest();
  xhr.open('POST', posturl, true);
  xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

  // send the collected data as JSON
  xhr.send(JSON.stringify(data));

  xhr.onloadend = function () {
    // done
  };
*/
    console.log('prepare!');
    data_json = JSON.stringify(data);
    $.ajax({
        url: posturl,
        type: 'POST',
        data: data_json,
        success: function(response) {
            console.log('Mom I did it');
        }
    });
   // post(posturl,data_json,'post');
    window.location = 'hostroom?hostfbid=' + host_fb_id;        
}



function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}
