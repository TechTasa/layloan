const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String,
    image:String,
    contentDelta: Object,
    author: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);
