const mongoose = require('mongoose'),
      Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
    name        : {type : String, trim : true, required : true},
    uid         : {type : String, trim : true, required : true},
    description : {type : String, default : '', trim : true},
    imgurl      : {type : String, default : '', trim : true},
    price       : {type : Number, default : 0, min : 0},
    live        : Boolean,
}, { timestamps: { createdAt: 'created_at' } });

ProductSchema.methods = {

};

ProductSchema.statics = {

    load : function (_id) {
        return this.findOne( {_id} )
               .populate('owner', 'name')
               .exec();
    },

    list : function (options) {
        const criteria = options || {};
        return this.find(criteria)
               .sort({'created_at' : -1})
               .exec();
    }
};

ProductSchema.index({name : 1, price : -1, owner : 1, live : 1});
mongoose.model('Product', ProductSchema);
