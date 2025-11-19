const express = require("express");

const router = express.Router();

const Blog = require("../models/blog");

const User = require("../models/user")

// Public pages: signup and login
router.get("/signup", (req,res) => {
    return res.render("signup");
});

router.get("/login", (req,res) => {
    return res.render("login", {error: null});
});

router.get("/add-blogs" , async (req,res) => {
    
    return res.render("add-blog" , {user: req.user})
});

router.get("/add-blogs/generate-with-ai", async (req,res) => {
    return res.render("generate-with-ai", {user: req.user});
})
module.exports = router;