const mongoose = require("mongoose");
const DB = process.env.DB_URL;
mongoose
  .connect(DB)
  .then(() => {
    console.log("connection Sucessful");
  })
  .catch((err) => console.log("Connection Error"));
