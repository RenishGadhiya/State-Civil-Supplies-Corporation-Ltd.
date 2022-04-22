const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const cookieparser = require("cookie-parser");

const PORT = process.env.PORT || 5500;
require("./db/connection");

const path = require("path");
const { resourceUsage } = require("process");
const staticPath = path.join(__dirname, "../frontend/html");
app.use(express.static(staticPath));
app.use(cookieparser());
app.use(require("./router/auth.js"));
app.listen(PORT, () => {
  console.log(`server is running at port number ${PORT}`);
});

app.use("/public", express.static(path.join(__dirname, "./public")));
