var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ChapterSchema = new mongoose.Schema({
    _journal: {type: Schema.Types.ObjectId, ref: "Journal"},
    chapter: {type: String},
    create_at: {type: Date, default: Date.now},
})
mongoose.model('Chapter', ChapterSchema)
