const express = require("express");

const  mongoose = require("mongoose");

const staticRoute = require("./routes/staticRoute");
const userRoute = require("./routes/user");


const path = require("path");

const app = express();

const PORT = 3003;

mongoose.connect("mongodb://127.0.0.1:27017/blogging-site-2")
.then(() => console.log("Mongo Connected"))
.catch((E) => console.log(E));

app.use(express.urlencoded({extended:false}));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use("/", staticRoute);
app.use("/user", userRoute)
app.listen(PORT, () => console.log(`Server is online at PORT ${PORT}`))