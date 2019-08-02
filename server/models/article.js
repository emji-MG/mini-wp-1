const mongoose = require('mongoose')
const Schema = mongoose.Schema

const articleSchema = new Schema({
    title : {
        type : String,
        required : [true, 'title is required, please fill in this field ']
    },
    content : {
        type : String,
        required : [true, 'every article must have content, please fill in this field']
    },
    image : {
        type : String,
        required : [true, 'Every article must have an Image ']
    },
    created_at :{
        type : Date,
        default : Date.now,
        timestamps: true
    },
    userId : {
        type : Schema.Types.ObjectId, ref : 'user'
    }
})

const article = mongoose.model('article', articleSchema)

module.exports = article