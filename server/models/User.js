var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  username: {type: String, required: true},
  requests: [{type: Schema.Types.ObjectId, ref: "User"}],
  picture: {type: Schema.Types.Mixed},
  morePictures: Schema.Types.Mixed,
  create_at: {type: Date, default: Date.now},
  journals: [{type: Schema.Types.ObjectId, ref: "Journal"}]
})

mongoose.model('User', UserSchema)
