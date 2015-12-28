var productlist = [];
var currentproduct = 0;
/*
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

$(fillProductListSlide(productlist));
$(fillCurrentProductBlock(currentproduct));
*/
$('.productlist').hover(function(){
    $('.productlistblock').animate({
        right:'0',
    },500);

}, function(){
    $('.productlistblock').animate({
        right:'-300',
    },500);

});

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

function fillProductListSlide(productlist){
    createGlobalList(productlist);
    $('.productlistblock').empty();
    var length = productlist.length
    for ( var i = 0 ; i < length ; i ++){
        append = generateAppendItem(i);
        $('.productlistblock').append(append); 
    }   
}

function fillCurrentProductBlock(position){
    $('#productname').empty();
    $('#productprice').empty();
    var productname = productlist[position]['productname'];
    var price = productlist[position]['price'];
    $('#productname').text(productname);
    $('#productprice').text(price); 

}

function fillHostName(name) {
  $('#hostname').empty();
  $('#hostname').text(name);
}


function createGlobalList(list){
    for (var e in list){
        var product = {};
        product['pid'] = list[e]['pid'];
        product['productname'] = list[e]['productname'];
        product['price'] = list[e]['price'];
        product['description'] = list[e]['description'];
        productlist.push(product);
    }
}
