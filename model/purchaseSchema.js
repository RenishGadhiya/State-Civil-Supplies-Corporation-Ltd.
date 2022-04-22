const mongoose = require("mongoose");
const purchaseSchema = new mongoose.Schema({
  adhar_number: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    require: true,
  },
  center: {
    type: String,
    require: true,
  },
  district: {
    type: String,
    require: true,
  },
  commodity: {
    type: String,
    require: true,
  },
  rate: {
    type: Number,
    require: true,
  },
  quantity: {
    type: Number,
    require: true,
  },
  payable_amount: {
    type: Number,
    require: true,
  },
  date_of_purchase: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("PURCHASEDETAILS", purchaseSchema);
