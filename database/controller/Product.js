const mongoose = require('mongoose'),
      wrap     = require('co-express'),
      Product  = mongoose.model('Product');


exports.insert = wrap (function * (req, res) {
    console.log(req);

    console.log(req.body);
});