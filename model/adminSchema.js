const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  admin_user: {
    type: String,
    require: true,
  },
  admin_password: {
    type: String,
    require: true,
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

adminSchema.methods.generateAuthToken = async function () {
  try {
    let myToken = jwt.sign({ _id: this._id }, process.env.KEY);
    this.tokens = this.tokens.concat({ token: myToken });
    await this.save();
    return myToken;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoose.model("ADMIN", adminSchema);
