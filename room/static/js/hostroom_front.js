var productlist = [];
var currentproduct = 0;
/*var productlist = [];


// example product info, will push into productlist
var product = {};
product['productname'] = 'Stussy';
product['price'] = '999';
product['description'] = "It's cool";
productlist.push(product);
var product1 = {};
product1['productname'] = 'Creation';
product1['price'] = '300';
product1['description'] = "It's eiekl";
productlist.push(product1);

*/

//$(fillProductListSlide(productlist));

$('.productlist').hover(function(){
    $('.productlistblock').animate({
        right:'0',
    },500);

}, function(){
    $('.productlistblock').animate({
        right:'-300',
    },500);
});

// Host want to change price.
$('#changepricebtn').click(function(){
    // OrderStatus defined in chatroom.js
    var new_price = $('#price-input').val();
    if(!isNaN(new_price))
      ChangePrice(new_price);
});

function triggerChangeCurrentItem(){
    $('.productitem').click(function(){
        currentproduct = $(this).data('item');
        SelectProduct(currentproduct);
    });
}
function fillProductListSlide(product_list){
    createGlobalList(product_list);
    $('.productlistblock').empty();
    var length = product_list.length
    for ( var i = 0 ; i < length ; i ++){
        append = generateAppendItem(i);
        $('.productlistblock').append(append); 
    }   
    triggerChangeCurrentItem();
}

function createGlobalList(list){
    productlist = [];
    for (var e in list){
        var product = {};
        product['pid'] = list[e]['pid'];
        product['productname'] = list[e]['productname'];
        product['price'] = list[e]['price'];
        product['description'] = list[e]['description'];
        productlist.push(product);
    }
}
function fillCurrentProductBlock(position){

    $('#currentname').empty();
    $('#currentprice').empty();
    var productname = productlist[position]['productname'];
    var price = productlist[position]['price'];
    $('#currentname').text(productname);
    $('#currentprice').text(price); 
}

function generateAppendItem(position){
    var title = productlist[position]['productname'];
    var price = productlist[position]['price'];
//    var description = productlist[position]['description'];  

     var append = '<div class="productitem" data-item="'+position+'">'+
                         ' <div class="productprofile">'+
                         ' </div>'+
                         ' <div class="iteminfo">'+
                             ' <div class="producttitle" title="'+title+'">'+title+
                              '</div>'+
                              '<div class="productprice">$'+price+
                              '</div>'+
  //                            '<div class="productdescription">'+description+
  //                            '</div>'+
                         '</div>'+
                    '</div>';
    return append
}


// Control WebView Block if  host want to close for a while

var ORIGINALWIDTH = '31%';
var RESIZEWIDTH = '98%';


$('.hidebtn').click(function(){
        hidewebview();
});
$('.showvideo').click(function(){
        showwebview();
});

function hidewebview(){
    $('#videoblock').animate({
        left:'-70%',},1000);
    $('#chat-container').animate({
        width:RESIZEWIDTH,},1000);
    $('#currentproduct').animate({
        left:'65%',},1000,
        function(){
            $('.showvideo').animate({left:'30px',},1000);
        }
    );
    $('.msg').css('font-size','30px');
    $('#currentproduct').css('background','rgba(255,255,255,0.7)');
    $('#currentproduct').children().css('color','black');
    $('#videoblock').css('display','none');
}

function showwebview(){
    $('#videoblock').css('display','block');
    $('#videoblock').animate({
        left:'0px',},1000);
    $('#chat-container').animate({
        width:ORIGINALWIDTH,},1000);
    $('#currentproduct').animate({
        left:'15px',},1000);
    $('.showvideo').animate({left:'-300px',},1000);
    $('#currentproduct').css('background','rgba(0,0,0,0.7)');
    $('#currentproduct').children().css('color','white');
    $('.msg').css('font-size','16px');
}
