const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
    heading: {
        type: String,
    },
    content: {
        type:String,
    }
},{ _id: false});


const contentSchema = mongoose.Schema({
    raw: {
        type: String,
        default: "",
    },
    introduction: {
        type: String,
        default: "",
    },
    sections: {
        type: [sectionSchema],
        default: []
    },
    conclusion: {
        type: String,
        default: ""
    },
    isStructured: {
        type:Boolean,
        default: false
    }
});


const blogSchema =  mongoose.Schema({
    title: {
        type : String,
        required: true, 
    },
    coverImageURL: {
        type: String,
    },
    content: {
        type: contentSchema,
        required: true,
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
}, {timestamps: true});


const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;