const express = require("express");

const staticRoute = require("./routes/staticRoute");

const path = require("path");

const app = express();

const PORT = 3003;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use("/", staticRoute);
app.listen(PORT, () => console.log(`Server is online at PORT ${PORT}`))