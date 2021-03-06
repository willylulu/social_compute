var user;
var uid;

function submit () {
	// body...

    if(uid == -1)
        return;

	var name = $("#productnametext").val();
	var price = $("#productpricetext").val();
	var description = $('textarea').val();
    var image_url = $('#status').val();

    var data = { 
        user        : user,
        uid         : uid,
        productname : name,
        price       : price,
        description : description,
        image_url   : image_url
    };

    data = JSON.stringify(data);

	$.ajax({
	      url         : "../insertproduct/",
	      type        : "POST",
	      data        : data,
          contentType : "application/json; charset=utf-8",
	      dataType    : "json"
	});
	$('#productnametext').val('');
	$('#productpricetext').val('');
	$('textarea').val('');
    console.log(user);
    console.log(uid);
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

function drawImage() {
	// body...
	var picture = $('#picture')[0];
	var file = picture.files[0];
	if (!file.type.match('image.*')) {
	    return;
	}
	var url = URL.createObjectURL(file);
	var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
    	var canvas = $("#canvas")[0];
	    var ctx = canvas.getContext('2d');
	    var dataURL;
	    canvas.height = 300*this.height/this.width;
	    canvas.width = 300;
	    ctx.drawImage(this, 0, 0,300,300*this.height/this.width);
    };
    img.src = url;
}
