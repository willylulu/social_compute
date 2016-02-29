const mongoose = require('mongoose'),
      Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    uid         : {type : String, default : '', trim : true, required : true},
    name        : {type : String, default : '', trim : true, required : true},
    streamurl   : {type : String, default : '', trim : true},
    products    : [ObjectId],
    online    : Boolean
}, {_id : false});

UserSchema.methods = {

    addProduct    : function (pid) {
        this.products.push(pid);
        return this.save();
    },

    removeProduct : function (pid) {
        const index = this.products.indexOf(pid);

        if(~index) {
            this.products.splice(index);
        } else {
            throw new Error('product not exist');
        }

        return this.save();
    }
}

UserSchema.statics = {

    load : function (uid) {
        return this.findOne({ uid })
               .exec();
    },

    list : function (options) {
        const criteria = options.criteria || {};
        return this.find(criteria)
               .exec();
    }

};


UserSchema.index({uid : 1});
mongoose.model('User', UserSchema);
