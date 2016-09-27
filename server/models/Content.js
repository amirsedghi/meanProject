var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ContentSchema = new mongoose.Schema({
  chapter: {type: Schema.Types.ObjectId, ref: "Chapter"},
  category: {type: Schema.Types.ObjectId, ref: "Category"},
  create_at: {type: Date, default: Date.now},
  title: {type: String},
  description: {type: String},
  images: [{ data: Buffer, contentType: String }],
})

mongoose.model('Content', ContentSchema)
