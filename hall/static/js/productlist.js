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

function FBinitCallback(){
	if(me!=undefined&&me.status=='connected'){
        FB.api('/me',function(res){
            $("#who").html('Hi! '+res.name);
        });
    }
}

function setModalAttribute(pk){
    var description = productlist[pk]['description'];
    var title = productlist[pk]['title'];
    var price = productlist[pk]['price'];
    var imgurl = productlist[pk]['imgurl'];
    $('.modaldescription').append(description);
    $('.modaltitle').text(title);
    var img = document.createElement("img");
    img.setAttribute('src',imgurl);
    img.setAttribute('width',570);
    $('.modalimage').append(img);
}

function cleanModal(){
    $('.modaldescription').empty();
    $('.modaltitle').empty();
    $('.modalimage').empty();
}

$('.productblock').click(function(){
    var pk = $(this).data('pk');
    cleanModal();
    setModalAttribute(pk);
});


checkOnlive();

