const mongoose = require('mongoose'),
      wrap     = require('co-express'),
      Product  = mongoose.model('Product'),
      User     = mongoose.model('User');


exports.insert = wrap(function * (uid, name) {
    try {
        const val  = { name : name };
        User.findOneAndUpdate({uid : uid}, val , { upsert : true }, function (err, doc) {
            console.log(err);
            console.log(doc);
        });
        return null;        
    } catch (err) {
        console.log(err);
        return err;
    } 
});


