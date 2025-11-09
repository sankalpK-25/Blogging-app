const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    content: {
        type:String,
    },
    blog: {
        type: mongoose.Types.ObjectId,
        ref: "blog"
    },
    commentedBy:{
        type: mongoose.Types.ObjectId,
        ref:"user"
    }
},{ timestamps: true });

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;