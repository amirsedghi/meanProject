var mongoose = require('mongoose')
var Schema = mongoose.Schema

var CategorySchema = new mongoose.Schema({
    _journal: {type: Schema.Types.ObjectId, ref: "Journal"},
    category: [{type: String}],
    create_at: {type: Date, default: Date.now},
})

mongoose.model('Category', CategorySchema)
