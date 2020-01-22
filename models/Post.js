const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true, unique: true},
    body: {type: String, required: true},
    tags: [{type:String}],
    date: {type:Date,default: Date.now},
    likes: {type:Number, default: 0},
    owner:{type:Types.ObjectId, ref:'User'}
})

module.exports = model('Post', schema)
