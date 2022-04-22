const Farmer = require("../model/farmerSchema");
const path = require("path");

exports.addfarmer = async (req, res) => {
  console.log(req.body);
  const {
    farmer_name,
    mobile_no,
    adhar_number,
    District,
    Center,
    Village,
    bank_name,
    bank_account_no,
    branch_code,
    land_area,
    date_of_registration,
  } = req.body;

  if (
    !farmer_name ||
    !adhar_number ||
    !land_area ||
    !Village ||
    !Center ||
    !District ||
    !mobile_no ||
    !bank_name ||
    !bank_account_no ||
    !branch_code
  ) {
    console.log("Please Enter all required Field");
    return res.sendFile(
      path.join(__dirname, "../frontend/farmer_registration.html")
    );
  }
  try {
    const farmerExist = await Farmer.findOne({ adhar_number: adhar_number });
    if (farmerExist) {
      console.log(farmer_name, " : ", adhar_number);
      console.log("Farmer Already Exist");
      return res.sendFile(
        path.join(__dirname, "../frontend/farmer_registration.html")
      );
    }
    var district = District;
    var taluka = Center;
    var village = Village;
    const newFarmer = new Farmer({
      farmer_name,
      adhar_number,
      land_area,
      village,
      taluka,
      district,
      mobile_no,
      bank_name,
      bank_account_no,
      branch_code,
      date_of_registration,
    });
    await newFarmer.save();
    console.log("Farmer registrated Succesusfully");
    res.sendFile(path.join(__dirname, "../frontend/sub.html"));
  } catch (err) {
    console.log(err);
  }
};
