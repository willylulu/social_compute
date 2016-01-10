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
	var picture = $('#picture')[0];
	var file = picture.files[0];
	if (!file.type.match('image.*')) {
		alarm("需為圖片格式!");
	    return;
	}
	drawImage(file);
	$.ajax({
	      url:"http://tvsalestream.herokuapp.com/insertproduct/",
	      type:"POST",
	      data:{user:user,uid:uid,productname:name,price:price,description:description},
	      dataType:"json"
	}).done(function() {

	});
	console.log('Done');
	$('#productnametext').val('');
	$('#productpricetext').val('');
	$('textarea').val('');
}
function drawImage(file){
	var img = new Image;
	img.src = URL.createObjectURL(file);
	img.onload = function() 
	{
		var c = $("#canvas")[0].getContext("2d");
		c.drawImage(img,0,0);
	}
}
//user
//uid