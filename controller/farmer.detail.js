const Farmer = require("../model/farmerSchema");

exports.farmerDetails = async (req, res) => {
  console.log(req.body);
  var {
    village,
    taluka,
    district,
    min_land_area,
    max_land_area,
    starting_date,
    ending_date,
  } = req.body;
  if (village == "Select Village" || village == "") {
    village = null;
  }
  if (taluka == "" || taluka == "Select Taluka") {
    taluka = null;
  }
  if (district == "" || district == "Select District") {
    district = null;
  }
  if (min_land_area == "") {
    min_land_area = null;
  }
  if (max_land_area == "") {
    max_land_area = null;
  }
  if (starting_date == "") {
    starting_date = null;
  }
  if (ending_date == "") {
    ending_date = null;
  }
  console.log(
    "| Village:",
    village,
    "| Taluka:",
    taluka,
    "| district:",
    district,
    "| min_land_area:",
    min_land_area,
    "| max_land_area:",
    max_land_area,
    "| starting_date:",
    starting_date,
    "| ending_date:",
    ending_date
  );
  var start_date = new Date(starting_date);
  var end_date = new Date(ending_date);
  var sortedFarmer = await Farmer.find({});

  console.log("length : ", sortedFarmer.length);
  if (village != null) {
    //console.log("You are in village");
    for (var i = 0; i < sortedFarmer.length; i++) {
      if (sortedFarmer[i].village != village) {
        sortedFarmer.splice(i, 1);
        i--;
      }
    }
  }
  if (taluka != null) {
    //console.log("You are in taluka");
    for (var i = 0; i < sortedFarmer.length; i++) {
      if (sortedFarmer[i].taluka != taluka) {
        sortedFarmer.splice(i, 1);
        i--;
      }
    }
  }
  if (district != null) {
    //console.log("You are in District");
    for (var i = 0; i < sortedFarmer.length; i++) {
      if (sortedFarmer[i].district != district) {
        sortedFarmer.splice(i, 1);
        i--;
      }
    }
  }
  if (min_land_area != null) {
    //console.log("You are in Min_land_Area");
    for (var i = 0; i < sortedFarmer.length; i++) {
      if (sortedFarmer[i].land_area < min_land_area) {
        sortedFarmer.splice(i, 1);
        i--;
      }
    }
  }
  if (max_land_area != null) {
    //console.log("You are in Max_Land_area");
    for (var i = 0; i < sortedFarmer.length; i++) {
      if (sortedFarmer[i].land_area > max_land_area) {
        sortedFarmer.splice(i, 1);
        i--;
      }
    }
  }
  if (starting_date != null) {
    //console.log("You are in Starting_Date");
    for (var i = 0; i < sortedFarmer.length; i++) {
      if (
        sortedFarmer[i].date_of_registration.getTime() < start_date.getTime()
      ) {
        sortedFarmer.splice(i, 1);
        i--;
      }
    }
  }
  if (ending_date != null) {
    //console.log("you are in ending date");
    for (var i = 0; i < sortedFarmer.length; i++) {
      if (sortedFarmer[i].date_of_registration.getTime() > end_date.getTime()) {
        sortedFarmer.splice(i, 1);
        i--;
      }
    }
  }
  console.log("Result of Search : ");
  console.log(sortedFarmer);
  res.status(200).json(sortedFarmer);
};
