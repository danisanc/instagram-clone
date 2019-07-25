const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    author: String,
    image: String,
    place: String,
    description: String,
    hashtags: String,
    likes: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)