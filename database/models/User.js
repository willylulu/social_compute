const mongoose = require('mongoose'),
      Schema   = mongoose.Schema, 
      ObjectId = Schema.ObjectId;


const UserSchema = new Schema({
    uid       : {type : String, default : '', trim : true},
    streamurl : {type : String, default : '', trim : true},
    online    : Boolean
});


UserSchema.index({uid : 1});
mongoose.model('User', UserSchema);
