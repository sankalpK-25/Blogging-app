const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog")
const aiRoute = require("./routes/aiRoute");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const Blog = require("./models/blog");


const app = express();

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Mongo Connected"))
.catch((E) => console.log(E));

app.use(express.urlencoded({extended:false}));
app.use(express.json())
app.use(cookieParser())

// Serve static assets (uploads, profile photos, css, etc.)
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use("/user", userRoute)

// Public auth routes (signup/login)
app.use("/",checkForAuthenticationCookie("token"), staticRoute);

app.use("/blog",checkForAuthenticationCookie("token"),blogRoute);

app.use("/api/ai",aiRoute);

// Protect homepage with authentication middleware
app.get("/", async (req, res) => {
	// populate author details (fullName and profileImage) for each blog
	const blogs = await Blog.find({}).populate('author', 'fullName profileImage');
	return res.render("home", { user: req.user, blogs: blogs});
});

app.listen(PORT, () => console.log(`Server is online at PORT ${PORT}`))
