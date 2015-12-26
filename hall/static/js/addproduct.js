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
	$.ajax({
	      url:"http://tvsalestream.herokuapp.com/insertproduct/",
	      type:"POST",
	      data:{user:user,uid:uid,productname:name,price:price},
	      dataType:"json"
	}).done(function() {
		console.log("data");
	}) ;
}
//user
//uid