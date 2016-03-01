const mongoose = require('mongoose'),
      Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;

const BuyQueueSchema = new Schema({
    productId : ObjectId,
    buyer     : ObjectId,
    owner     : ObjectId
});

BuyQueueSchema.statics = {
    load : function (_id) {
        return this.findOne({ _id })
               .populate('owner', 'uid name')
    },

    list : function (options) {
        const criteria = options.criteria || {};
        const sort     = options.sort || {};
        return this.find(criteria)
               .sort(sort)
               .exec();
    }
}


BuyQueueSchema.index({productId : 1, buyer : 1, owner : 1});
mongoose.model('BuyQueue', BuyQueueSchema);
