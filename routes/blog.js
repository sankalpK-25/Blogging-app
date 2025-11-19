const express = require("express");

const router = express.Router();

const Blog = require("../models/blog");
const Comment = require("../models/comment");

const multer = require("multer");
const path =  require("path");


function generateRandomTextContent(wordCount){
    let text = '';

    const characters = 'abcdefghijklmnopqrstuvwxyz';

    const characterArray = characters.split('');

    for (let char = 0; char <= wordCount; char++) {
        
        let randomNumber = Math.floor(Math.random() * 26)

        let char = characterArray[randomNumber];

        text += char; 
    }

    return text;
}

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,path.join("uploads", "../public/uploads"))
    },
    filename: function(req,file,cb){
        const filename = `${Date.now()} - ${file.originalname}`
        cb(null,filename);
    }
})


const upload = multer( { storage: storage});



router.post("/add-blog",upload.single("coverImage"), async (req,res) => {

    let {title,content} = req.body;
    const coverImageURL = req.file ? `/uploads/${req.file?.filename}` : null;



    let parsedContent;
    let isStructured ;
    try{
        parsedContent = JSON.parse(content);
        content = parsedContent
        isStructured = true;

    }catch(err){
        parsedContent = content;
        isStructured = false;
    }

    if(isStructured){
        await Blog.create({
        title,
        coverImageURL,
        content: {
            introduction: parsedContent.introduction,
            sections: parsedContent.sections,
            conclusion: parsedContent.conclusion
        },
        author: req.user.id,
        isStructured
        });
    }
    else{
        await Blog.create({
        title,
        coverImageURL,
        content: { 
            raw: content,
        },
        author: req.user.id,
        isStructured
        });
    }

    return res.redirect("/");
})


router.get("/:id", async (req,res) => {
    const blogId = req.params.id;

    // load blog with author info
    const blog = await Blog.findById(blogId).populate('author', 'fullName profileImage');

    // load comments for this blog, populated with commenter info, newest first
    const comments = await Comment.find({ blog: blogId })
        .populate('commentedBy', 'fullName profileImage')
        .sort({ createdAt: -1 });

    const user = req.user;

    return res.render("blog" ,{ user: user, blog: blog, comments: comments })

});

router.post("/:id/comment", async (req,res) => {
    const blogId = req.params.id;

    const {content} = req.body;

    await Comment.create({
        content,
        blog: blogId,
        commentedBy: req.user.id,
    });

    return res.redirect(`/blog/${blogId}`);

})

router.post("/generate-with-ai", async (req,res) => {
    
})
module.exports = router;