const express = require("express");
const {generateBlog, saveAiContent} = require("../controllers/aiController");

const router = express.Router();

router.post("/generate", generateBlog);

// router.post("/save-ai-content", saveAiContent);

module.exports = router;