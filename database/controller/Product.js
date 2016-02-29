const mongoose = require('mongoose'),
      wrap     = require('co-express'),
      Product  = mongoose.model('Product'),
      User     = mongoose.model('User');


exports.insert = wrap (function * (req, res) {
    try {
        const uid     = req.body.uid;
        const user    = yield User.load(uid);
        const product = new Product({
            name        : req.body.productname,
            price       : req.body.price,
            description : req.body.description,
            imgurl      : req.body.image_url,
            uid         : uid
        });

        yield product.save();
        yield user.addProduct(product._id);

        console.log('insert product to ' + uid);

        res.sendStatus(400);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    } 
});