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
}


BuyQueueSchema.index({productId : 1, buyer : 1, owner : 1});
mongoose.model('BuyQueue', BuyQueueSchema);
