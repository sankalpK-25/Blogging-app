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
 try {
        const token = await User.matchPasswordAndGenerateToken(email,password);
        
        return res.cookie("token",token).redirect("/");

    }catch (error) {
        return res.render("login", {
            error: "Incorrect Email or Password",
        });
    }

});

router.get("/logout" , (req,res) => {
    return res.clearCookie("token").redirect("/login");
})

module.exports = router;
