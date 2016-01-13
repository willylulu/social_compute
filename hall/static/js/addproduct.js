var user;
var uid;
function FBinitCallback () {
	// body...
	FB.api('/me',function(res){
	        user = res.name;
	        uid = res.id;
    	});
}
function submit () {
	// body...
	var name = $("#productnametext").val();
	var price = $("#productpricetext").val();
	var description = $('textarea').val();
	$.ajax({
	      url:"http://tvsalestream.herokuapp.com/insertproduct/",
	      type:"POST",
	      data:{user:user,uid:uid,productname:name,price:price,description:description,image_url:$('#status').val()},
	      dataType:"json"
	}).done(function() {});
	$('#productnametext').val('');
	$('#productpricetext').val('');
	$('textarea').val('');
}
//user
//uid
function convertToDataURLviaCanvas(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
function upload () {
	// body...
	var picture = $('#picture')[0];
	var file = picture.files[0];
	if (!file.type.match('image.*')) {
	    return;
	}
	var url = URL.createObjectURL(file);
	convertToDataURLviaCanvas(url,function(base64Img){
		var temp = base64Img.split(',')[1];
		//console.log(temp);
		$("#status").html("上傳中...");
		$.ajax({ 
		    url: 'https://api.imgur.com/3/upload',
		    headers: {
		        'Authorization': 'Client-ID d683f0b0ac51745'
		    },
		    type: 'POST',
		    data: {
		    	'type': 'base64',
		        'image': temp
		    },
		    success: function(res) {
		    	var up_url = res.data.link;
		    	$("#status").html("上傳成功");
		    	$("#status").val(up_url);
		    	submit();
		    }
		});
	},'image/png');
}