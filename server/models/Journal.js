var mongoose = require('mongoose')
var Schema = mongoose.Schema

var JournalSchema = new mongoose.Schema({
  _friend1 : {type: Schema.Types.ObjectId, ref: "User"},
  _friend2 : {type: Schema.Types.ObjectId, ref: "User"},
  content : [{type: Schema.Types.ObjectId, ref: "Content"}],
  chapter:[{
    name:{type:String}
  }],
  category:[{
    name:{type:String}
  }],
  create_at: {type: Date, default: Date.now},
})

mongoose.model('Journal', JournalSchema)
