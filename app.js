const express = require("express");

const mongoose = require("mongoose");

const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");

const cookieParser = require("cookie-parser");


const path = require("path");
const { checkForAuthenticationCookie } = require("./middlewares/authentication")

const app = express();

const PORT = 3003;

mongoose.connect("mongodb://127.0.0.1:27017/blogging-site-2")
.then(() => console.log("Mongo Connected"))
.catch((E) => console.log(E));

app.use(express.urlencoded({extended:false}));

app.use(cookieParser())

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use("/user", userRoute)

// Public auth routes (signup/login)
app.use("/",checkForAuthenticationCookie("token"), staticRoute);

// Protect homepage with authentication middleware
app.get("/", (req, res) => {
	// At this point req.user is set by middleware; if not present, middleware redirects to /login
	return res.render("home", { user: req.user });
});
app.listen(PORT, () => console.log(`Server is online at PORT ${PORT}`))