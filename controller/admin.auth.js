const Admin = require("../model/adminSchema");
const path = require("path");
const { addListener } = require("process");

exports.adminLogin = async (req, res) => {
  const { admin_user, admin_password } = req.body;

  if (!admin_user || !admin_password) {
    return res.sendFile(path.join(__dirname, "../frontend/login.html"));
  }
  try {
    const adminExist = await Admin.findOne({ admin_user: admin_user });

    if (!adminExist) {
      console.log("Please Enter valid credential");
      return res.sendFile(path.join(__dirname, "../frontend/login.html"));
    } else {
      if (adminExist.admin_password != admin_password) {
        console.log("Please Enter valid credential");
        return res.sendFile(path.join(__dirname, "../frontend/login.html"));
      }
      let token = await adminExist.generateAuthToken();
      res.cookie("SCSCL", token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      });
      console.log("User Login Sucessufully");
      return res.sendFile(path.join(__dirname, "../frontend/sub.html"));
    }
  } catch (err) {
    console.log(err);
  }
};

exports.adminRegistration = async (req, res) => {
  const { admin_user, admin_password } = req.body;

  if (!admin_user || !admin_password) {
    return res
      .status(422)
      .json({ err: "Please Enter in All the required field" });
  }
  try {
    const adminExist = await Admin.findOne({ admin_user: admin_user });

    if (adminExist) {
      console.log(buyer_email);
      return res.status(400).json({ error: "admin already exist" });
    }
    const newAdmin = new Admin({
      admin_user,
      admin_password,
    });

    await newAdmin.save();
    console.log("Admin registreted succesusfully");
    res.status(200).json({ messgae: "admin registreted successufully" });
  } catch (err) {
    console.log(err);
  }
};

// var LocalStorage = require("node-localstorage").LocalStorage;
// localStorage = new LocalStorage("./scratch");
// localStorage.setItem("Token", token);
// console.log("this is local storage ", localStorage.getItem("Token"));
