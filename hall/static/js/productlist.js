var now_from=0;
var onlive={};
function checkOnlive() {
	// body...
	for(var e in onlive_channel){
		for (var i = 0; i < onlive_channel[e].ProductList.length; i++) {
			onlive[onlive_channel[e].ProductList[i].pid]=true;
		};
	}
}

function createProduct (container,i) {
	// body...
	var product_body = document.createElement("div");
	product_body.setAttribute('id',productlist[i].pk);
	product_body.setAttribute('owner',productlist[i].fields.owner);
	product_body.setAttribute('class','product_body');
	product_body.setAttribute('show',0);
	product_body.setAttribute('onClick','clickbody('+productlist[i].pk+')');
	$(container).append(product_body);
	var product_name = document.createElement("p");
	product_name.innerHTML ='Name: '+productlist[i].fields.name;
	product_name.id = productlist[i].pk;
	product_name.className = 'product_name product_body_element';
	product_body.appendChild(product_name);
	var product_price = document.createElement("p");
	product_price.innerHTML ='Price: '+productlist[i].fields.price;
	product_price.id = productlist[i].pk;
	product_price.className ='product_price product_body_element';
	product_body.appendChild(product_price);
	if(onlive[productlist[i].pk]==true){
		var product_onlive = document.createElement("p");
		product_onlive.innerHTML ='Onlive: True';
		product_onlive.id = productlist[i].pk;
		product_onlive.className = 'product_onlive product_body_element';
		product_body.appendChild(product_onlive);
	}
	var product_info = document.createElement("div");
	product_info.className = 'product_info';
	product_info.id = productlist[i].pk+"_info";
	product_info.setAttribute('style','display:none;');
	product_body.appendChild(product_info);
	var product_name = document.createElement("p");
	product_name.innerHTML ='Name: '+productlist[i].fields.name;
	product_name.id = productlist[i].pk;
	product_name.className = 'product_name product_info_element';
	product_info.appendChild(product_name);
	var product_price = document.createElement("p");
	product_price.innerHTML ='Price: '+productlist[i].fields.price;
	product_price.id = productlist[i].pk;
	product_price.className ='product_price product_info_element';
	product_info.appendChild(product_price);
	if(onlive[productlist[i].pk]==true){
		var product_onlive = document.createElement("p");
		product_onlive.innerHTML ='Onlive: True';
		product_onlive.id = productlist[i].pk;
		product_onlive.className = 'product_onlive product_info_element';
		product_info.appendChild(product_onlive);
	}
	var product_ownername = document.createElement("p");
	product_ownername.innerHTML ='OwnerName: '+productlist[i].fields.ownername;
	product_ownername.id = productlist[i].pk;
	product_ownername.className = 'product_ownername product_info_element';
	product_info.appendChild(product_ownername);
	if(productlist[i].fields.description.length!=0){
		var product_description = document.createElement("p");
		product_description.innerHTML ='Description: '+productlist[i].fields.description;
		product_description.id = productlist[i].pk;
		product_description.className = 'product_description product_info_element';
		product_info.appendChild(product_description);
	}
	$(".product_body_element").css('display','inline-block');
	$(".product_body_element").css('margin','5px');
	$(".product_info_element").css('display','inline-block');
	$(".product_info_element").css('margin','2px');
}

function showProducts (container,f,t) {
	// body...
	var to = (t<productlist.length)?t:productlist.length;
	var from = (f>=0)?f:0;
	for (var i = from; i < to; i++) {
		createProduct(container,i);
	};
}

$('.button').click(function(){
	switch($(this).attr('id')){
		case 'pre':
			$("#productlist_container").html("");
			now_from = (now_from>5)?now_from-5:0;
			showProducts('#productlist_container',now_from,now_from+5);
			break;
		case 'next':
			$("#productlist_container").html("");
			now_from = (now_from+5<productlist.length)?now_from+5:now_from;
			showProducts('#productlist_container',now_from,now_from+5);
			break;
	}
});
function clickbody(pid){
	if($('#'+pid).attr('show')==0){
		$('#'+pid).attr('show',1);
		showInfo(pid);
	}
	else{
		$('#'+pid).attr('show',0);
		hideInfo(pid);
	}
}
function hideInfo(pid){
	$("#"+pid+"_info").slideUp()
}
function showInfo(pid){
	$("#"+pid+"_info").slideDown()
}
function FBinitCallback(){
	if(me!=undefined&&me.status=='connected'){
        FB.api('/me',function(res){
            $("#who").html('Hi! '+res.name);
        });
    }
}
checkOnlive();
showProducts('#productlist_container',now_from,now_from+5);