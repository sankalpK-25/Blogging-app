const express = require("express");

const router = express.Router();

const User = require("../models/user");

const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,path.join("profile-photos", "../public/profile-photos"))
    },
    filename: function (req,file,cb){
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null,fileName);
    }
})


const upload = multer({storage:storage});


router.post("/signup",upload.single("profileImage"), async (req,res) => {
    const { fullName, email, password} = req.body;

    try {
        const userData = { fullName, email, password };

        if (req.file) {
            userData.profileImage = `/profile-photos/${req.file.filename}`;
        }

        await User.create(userData);

    return res.redirect("/login");

    } catch (error) {
        console.log(error);
        return res.render("signup", { error: "SOmething went Wrong while Signup"} );
    }
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
