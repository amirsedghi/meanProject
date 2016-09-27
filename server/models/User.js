var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  create_at: {type: Date, default: Date.now}
})

mongoose.model('User', UserSchema)
