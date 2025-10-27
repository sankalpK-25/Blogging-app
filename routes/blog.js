const express = require("express");

const router = express.Router();

const Blog = require("../models/blog");

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
    const {title,content} = req.body;

    await Blog.create({
        title,
        coverImageURL: `/uploads/${req.file.filename}`,
        content: content +" "+ generateRandomTextContent(100),
        author: req.user.id,
        });

    return res.redirect("/");
})

router.get("/:id", async (req,res) => {
    const blogId = req.params.id;

    const blog = await Blog.findOne({_id: blogId});

    const user = req.user;
    
    return res.render("blog" ,{ user: user, blog: blog} )

})
module.exports = router;