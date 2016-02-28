const mongoose = require('mongoose'),
      Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;



const ProductSchema = new Schema({
    name        : {type : String, default : '', trim : true},
    description : {type : String, default : '', trim : true},
    imgurl      : {type : String, default : '', trim : true},
    price       : {type : Number, min : 0},
    owner       : ObjectId,
    live        : Boolean,
});


ProductSchema.methods = {

};


ProductSchema.index({name : 1, price : -1, owner : 1, live : 1});
mongoose.model('Product', ProductSchema);
