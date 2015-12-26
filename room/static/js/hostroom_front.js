/*
var currentproduct = 0;
var productlist = [];


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
//$(fillCurrentProductBlock(currentproduct));

var productlist;

$('.productlist').hover(function(){
    $('.productlistblock').animate({
        right:'0',
    },500);

}, function(){
    $('.productlistblock').animate({
        right:'-300',
    },500);

});


function triggerChangeCurrentItem(){
    $('.productitem').click(function(){
        currentproduct = $(this).data('item');
        fillCurrentProductBlock(currentproduct);
    })
}


function fillProductListSlide(product_list){
    $('.productlistblock').empty();
    productlist = product_list;
    var length = product_list.length
    for ( var i = 0 ; i < length ; i ++){
        append = generateAppendItem(i);
        $('.productlistblock').append(append); 
    }   
    triggerChangeCurrentItem(); 
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
    var description = productlist[position]['description'];  

     var append = '<div class="productitem" data-item="'+position+'">'+
                         ' <div class="productprofile">'+
                         ' </div>'+
                         ' <div class="iteminfo">'+
                             ' <div class="producttitle">'+title+
                              '</div>'+
                              '<div class="productprice">$'+price+
                              '</div>'+
                              '<div class="productdescription">'+description+
                              '</div>'+
                         '</div>'+
                    '</div>';
    return append
}

