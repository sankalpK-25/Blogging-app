const mongoose = require("mongoose");

const blogSchema =  mongoose.Schema({
    title: {
        type : String,
        required: true, 
    },
    coverImageURL: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
}, {timestamps: true});


const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;