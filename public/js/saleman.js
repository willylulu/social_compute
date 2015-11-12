function SelectProduct()
{
	//clear 
}

function SellerChangePrice(price)
{
    //change my on price
    var sendObj = new Object;
    sendObj.user = me;
    sendObj.price = price;
    socket.emit('seller_change_price',sendObj);

}

function UpdateSellerPrice(response)
{
    //price list 
    response.user.name;
    response.price = 
}


function SellerConfirmProductOrder(customers)
{
	var sendObj = new Object;
	sendObj.customers = customers;
	socket.emit('seller_confirm_product_order',sendObj);
}

function 