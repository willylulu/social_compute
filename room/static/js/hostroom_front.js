$('.productlist').hover(function(){
    $('.productlistblock').animate({
        right:'0',
    },500);

}, function(){
    $('.productlistblock').animate({
        right:'-300',
    },500);

});
