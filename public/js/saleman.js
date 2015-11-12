function SelectProduct(product_id)
{
	//clear 
	var sendObj = new Object;
    sendObj.user = me;
    sendObj.product = new Object;
    sendObj.product.id = product_id;

	socket.emit('select_product',sendObj);
}


function SellerChangePrice(price)
{
    //change my on price
    var sendObj = new Object;
    sendObj.user = me;
    sendObj.price = price;
    socket.emit('seller_change_price',sendObj);

}



function SellerConfirmProductOrder(customers)
{
	var sendObj = new Object;
	sendObj.customers = customers;
	socket.emit('seller_confirm_product_order',sendObj);
}

function 