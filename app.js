const express = require("express");

const mongoose = require("mongoose");

const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog")

const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");

const path = require("path");
const { checkForAuthenticationCookie } = require("./middlewares/authentication")

const app = express();

const PORT = 3003;

mongoose.connect("mongodb://127.0.0.1:27017/blogging-site-2")
.then(() => console.log("Mongo Connected"))
.catch((E) => console.log(E));

app.use(express.urlencoded({extended:false}));

app.use(cookieParser())

// Serve static assets (uploads, profile photos, css, etc.)
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use("/user", userRoute)

// Public auth routes (signup/login)
app.use("/",checkForAuthenticationCookie("token"), staticRoute);

app.use("/blog", blogRoute);

// Protect homepage with authentication middleware
app.get("/", async (req, res) => {
	// populate author details (fullName and profileImage) for each blog
	const blogs = await Blog.find({}).populate('author', 'fullName profileImage');
	return res.render("home", { user: req.user, blogs: blogs});
});
app.listen(PORT, () => console.log(`Server is online at PORT ${PORT}`))