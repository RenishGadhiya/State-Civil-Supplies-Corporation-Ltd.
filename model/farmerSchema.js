const mongoose = require("mongoose");
const farmerSchema = new mongoose.Schema({
  farmer_name: {
    type: String,
    require: true,
  },
  adhar_number: {
    type: String,
    require: true,
  },
  land_area: {
    type: Number,
    require: true,
  },
  village: {
    type: String,
    require: true,
  },
  taluka: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  mobile_no: {
    type: Number,
    require: true,
  },
  bank_name: {
    type: String,
    require: true,
  },
  bank_account_no: {
    type: Number,
    require: true,
  },
  branch_code: {
    type: String,
    require: true,
  },
  date_of_registration: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("FARMERDETAILS", farmerSchema);
