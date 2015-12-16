
var ptr = 1;
var bound = $('.product_list').length;

window.onload = function (){
 draw();
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
	
	if (ptr == bound || ptr + 3 > bound){
		$('#next_btn').hide();
	}
	else{
	$('#next_btn').show();
	}

	if(ptr == 1){
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
	window.location.href = './addproduct';
}


function create(){
    
        $('#openstream').modal('hide'); 
}

function openhost(){
    var posturl = 'http://localhost:3000/';
    var host_name = $('#youtubeurl').data('name');
    var host_fb_id = $('#youtubeurl').data('uid');
    var stream_url = $('#youtubeurl').val();
    var productlist = [];
    $("input[name='product[]']:checked").each(function(){
        var checkproduct = {};
        checkproduct['pid'] = $(this).val();
        checkproduct['pname'] = $(this).data('product');
        productlist.push(checkproduct);
    });
    
    data = {};
    data['hostname'] = host_name;
    data['hostfbid'] = host_fb_id;
    data['streamurl'] = stream_url;
    data['productlist'] = productlist;

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
