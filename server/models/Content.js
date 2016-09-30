var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ContentSchema = new mongoose.Schema({
  _user: {type: Schema.Types.ObjectId, ref: "User"},
  chapter: {type: String},
  category: {type: String},
  create_at: {type: Date, default: Date.now},
  title: {type: String},
  description: {type: String},
  images: Schema.Types.Mixed,
})

mongoose.model('Content', ContentSchema)
