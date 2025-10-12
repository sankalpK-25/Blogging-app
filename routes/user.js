const express = require("express");

const router = express.Router();

const User = require("../models/user");

router.post("/signup", async (req,res) => {
    const { fullName, email, password} = req.body;

    await User.create({fullName,email,password});

    return res.redirect("/")
});

router.post("/login", async (req,res) => {
    const {email,password} = req.body;

    const user = await User.matchPasswordAndGenerateToken(email,password);

    if(!user) return;

    return res.redirect("/")
})

module.exports = router