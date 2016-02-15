var now_from=0;
var onlive={};
function CheckOnlive() {
	for(var e in onlive_channel){
		for (var i = 0; i < onlive_channel[e].ProductList.length; i++) {
			var onlineid = onlive_channel[e].ProductList[i].pid;
            onlive[onlineid]=true;
            var onlineblock = $('.productblock[data-pk="'+onlineid+'"]');
            onlineblock.addClass('streaming');
            onlineblock.append(appendbtn());
		};
	}
    console.log(onlive);
}

function FBinitCallback(){
	if(me!=undefined&&me.status=='connected'){
        FB.api('/me',function(res){
            $("#who").html('Hi! '+res.name);
        });
    }
}

function appendbtn(){
    var btn = '<div class="gostreambtn">前往直播</div>';
    return btn;
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
function TriggerAction(){
    $('.gostreambtn').click(function(){
        var hostid = $(this).parent().data('owner');
        $('.headcover').text('前往直播');
        $('.headcover').animate({
            height:'100%',
        },1000)
        .animate({opacity:'1'},1000,function(){
        setTimeout(function(){
            window.location.href="./chatroom?hostfbid="+hostid;
            },500);
        });
    });

    $('.backarrow').click(function(){
        window.location.href="/";
    });
}
CheckOnlive();
TriggerAction();
