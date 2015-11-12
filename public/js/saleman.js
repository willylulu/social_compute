

function SelectProduct()
{

}

function SellerChangePrice()
{
    //change my on price
    var price = $('#price-input').val();

    var sendObj = new Object;
    sendObj.user = me;
    sendObj.price = price;

    socket.emit('seller-price-changed',sendObj);
}

function UpdateSellerPrice(response)
{
    //price list 
    response.user.name;
    response.price
}