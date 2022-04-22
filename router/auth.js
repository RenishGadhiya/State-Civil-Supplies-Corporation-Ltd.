const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
require("../db/connection");
const path = require("path");
router.use(express.json());
router.use(bodyParser.urlencoded({ extended: true }));
const farmerController = require("../controller/farmer.auth");
const purchaseController = require("../controller/purchase.auth");
const adminController = require("../controller/admin.auth");
const farmerDetailsController = require("../controller/farmer.detail");
const purchaseDetailsController = require("../controller/purchase.detail");
const middleware = require("../middleware/middleware");

router.get("/", (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, "../frontend/SCSCL.html"));
});





router.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/about.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

router.get("/logout", middleware, async (req, res) => {
  try {
    console.log("Logout successfully");
    res.clearCookie("SCSCL");
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/registerFarmer", middleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/farmer_registration.html"));
});

router.get("/procurement_commodity", middleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/purchase.html"));
});

router.get("/farmer_detail", middleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/farmer_details.html"));
});

router.get("/procurement_detail", middleware, (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/Purchasedetails.html"));
});

router.post("/farmerRegistration", middleware, farmerController.addfarmer);

router.post("/purchase", middleware, purchaseController.purchase);

router.post("/adminLogin", adminController.adminLogin);

router.post("/adminRegister", adminController.adminRegistration);

router.post("/farmerSearch", middleware, farmerDetailsController.farmerDetails);

router.post(
  "/purchaseDetails",
  middleware,
  purchaseDetailsController.purchaseDetails
);

module.exports = router;
