const mongoose = require('mongoose'),
      wrap     = require('co-express'),
      Product  = mongoose.model('Product'),
      User     = mongoose.model('User');


exports.insert = wrap (function * (req, res) {
    try {
        const uid  = req.user.id;
        const val  = { name : req.user.displayName };
     
        User.findOneAndUpdate({uid : uid}, val , { upsert : true }, function (err, doc) {
            console.log(err);
            console.log(doc);
        });
        
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    } 
});