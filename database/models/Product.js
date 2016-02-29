const mongoose = require('mongoose'),
      Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name        : {type : String, trim : true, required : true},
    description : {type : String, default : '', trim : true},
    imgurl      : {type : String, default : '', trim : true},
    owner       : {type : ObjectId, required : true},
    price       : {type : Number, default : 0, min : 0},
    live        : Boolean,
});

ProductSchema.methods = {

};

ProductSchema.statics = {

    load : function (_id) {
        return this.findOne({ _id })
               .populate('owner', 'name')
               .exec();
    },

    list : function (options) {
        const criteria = options.criteria || {};

        return this.find(criteria)
               .exec();
    }
};

ProductSchema.index({name : 1, price : -1, owner : 1, live : 1});
mongoose.model('Product', ProductSchema);
