const Purchase = require("../model/purchaseSchema");
const Farmer = require("../model/farmerSchema");
const path = require("path");

exports.purchase = async (req, res) => {
  const {
    adhar_number,
    village,
    center,
    district,
    commodity,
    rate,
    quantity,
    payable_amount,
    date_of_purchase,
  } = req.body;

  if (
    !adhar_number ||
    !village ||
    !center ||
    !district ||
    !rate ||
    !quantity ||
    !commodity ||
    !payable_amount
  ) {
    return res.sendFile(path.join(__dirname, "../frontend/purchase.html"));
  }
  try {
    const farmerExist = await Farmer.findOne({ adhar_number: adhar_number });
    if (!farmerExist) {
      return res.sendFile(path.join(__dirname, "../frontend/purchase.html"));
    }
    const newPurchase = new Purchase({
      adhar_number,
      village,
      center,
      district,
      commodity,
      rate,
      quantity,
      payable_amount,
      date_of_purchase,
    });
    await newPurchase.save();
    res.sendFile(path.join(__dirname, "../frontend/sub.html"));
  } catch (err) {
    console.log(err);
  }
};
