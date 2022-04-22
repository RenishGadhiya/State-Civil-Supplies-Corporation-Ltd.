const Purchase = require("../model/purchaseSchema");

exports.purchaseDetails = async (req, res) => {
  console.log(req.body);
  var {
    adhar_no,
    district,
    center,
    village,
    commodity,
    starting_date,
    ending_date,
    payable_amount_from,
    payable_amount_to,
  } = req.body;
  if (adhar_no == "") {
    adhar_no = null;
  }
  if (district == "Select District" || district == "") {
    district = null;
  }
  if (center == "Select Center" || center == "") {
    center = null;
  }
  if (village == "Select Village" || village == "") {
    village = null;
  }
  if (commodity == "Select Commodity" || commodity == "") {
    commodity = null;
  }
  if (starting_date == "" || starting_date == 0) {
    starting_date = null;
  }
  if (ending_date == "" || ending_date == 0) {
    ending_date = null;
  }
  if (payable_amount_from == "") {
    payable_amount_from = null;
  }
  if (payable_amount_to == "") {
    payable_amount_to = null;
  }
  console.log(
    "|adhar_no:",
    adhar_no,
    "|district:",
    district,
    "|center:",
    center,
    "|village:",
    village,
    "|commodity:",
    commodity,
    "|starting_date:",
    starting_date,
    "|ending_date:",
    ending_date,
    "|payable_amount_from:",
    payable_amount_from,
    "|payable_amount_to:",
    payable_amount_to
  );
  var start_date = new Date(starting_date);
  var end_date = new Date(ending_date);
  var sortedPurchase;

  if (adhar_no != null) {
    sortedPurchase = await Purchase.find({ adhar_number: adhar_no });
  } else {
    sortedPurchase = await Purchase.find({});
  }
  if (village != null) {
    for (var i = 0; i < sortedPurchase.length; i++) {
      if (sortedPurchase[i].village != village) {
        sortedPurchase.splice(i, 1);
        i--;
      }
    }
  }

  if (center != null) {
    for (var i = 0; i < sortedPurchase.length; i++) {
      if (sortedPurchase[i].center != center) {
        sortedPurchase.splice(i, 1);
        i--;
      }
    }
  }
  if (district != null) {
    for (var i = 0; i < sortedPurchase.length; i++) {
      if (sortedPurchase[i].district != district) {
        sortedPurchase.splice(i, 1);
        i--;
      }
    }
  }
  if (commodity != null) {
    for (var i = 0; i < sortedPurchase.length; i++) {
      if (sortedPurchase[i].commodity != commodity) {
        sortedPurchase.splice(i, 1);
        i--;
      }
    }
  }
  if (starting_date != null) {
    for (var i = 0; i < sortedPurchase.length; i++) {
      if (sortedPurchase[i].date_of_purchase.getTime() < start_date.getTime()) {
        sortedPurchase.splice(i, 1);
        i--;
      }
    }
  }
  if (ending_date != null) {
    for (var i = 0; i < sortedPurchase.length; i++) {
      if (sortedPurchase[i].date_of_purchase.getTime() > end_date.getTime()) {
        sortedPurchase.splice(i, 1);
        i--;
      }
    }
  }
  if (payable_amount_from != null) {
    for (var i = 0; i < sortedPurchase.length; i++) {
      if (sortedPurchase[i].payable_amount < payable_amount_from) {
        sortedPurchase.splice(i, 1);
        i--;
      }
    }
  }
  if (payable_amount_to != null) {
    for (var i = 0; i < sortedPurchase.length; i++) {
      if (sortedPurchase[i].payable_amount > payable_amount_to) {
        sortedPurchase.splice(i, 1);
        i--;
      }
    }
  }

  res.status(200).json(sortedPurchase);
};
