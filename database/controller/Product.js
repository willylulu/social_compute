const mongoose = require('mongoose'),
      wrap     = require('co-express'),
      Product  = mongoose.model('Product'),
      User     = mongoose.model('User');


exports.insert = wrap (function* (req, res) {
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

        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    } 
});

exports.productlist = wrap (function* (req, res) {
    try {
        const products  = yield Product.list({});
        const channels  = require('../../index.js').channels;

        console.log('show all products');
        console.log(products);
        res.render(__dirname + '/../../hall/templates/productlist.html', 
                 {'productlist' : products, 'onlive_channel' : JSON.stringify(channels)});
        // res.json(products);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
});

exports.getUserProduct = wrap ( function* (req, res, next) {
    try {
        const uid      = req.query.id || req.user.id;
        const options  = { 'uid' : uid };
        const products = yield Product.list(options);

        res.products = products;
        next();
    } catch (err) {
        console.log(err);
        next();
    }
});
