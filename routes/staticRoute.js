const express = require("express");

const router = express.Router();

// Public pages: signup and login
router.get("/signup", (req,res) => {
    return res.render("signup");
});

router.get("/login", (req,res) => {
    return res.render("login", {error: null});
});

module.exports = router;