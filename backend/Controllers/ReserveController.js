const connectToDatabase = require("../utils/db");

const ReserveController = async (req, res) => {
  try {
    let psgName = req?.body?.psgName;
    let psgEmail = req?.body?.psgEmail;
    let psgPhone = req?.body?.psgPhone;
    let gender = req?.body?.gender;
    // let age = req?.body?.psgAge;
    let rideID = req?.body?.rideID;

    let busName = req?.body?.busName;
    let seatDetails = req?.body?.seatDetails; // Comma-separated seat numbers
    let shift = req?.body?.shift;
    let time = req?.body?.time;
    let routeTo = req?.body?.routeTo;
    let routeFrom = req?.body?.routeFrom;
    let date = req?.body?.date;

    if (!psgName) {
      return res.status(200).json({
        msg: "Name is required",
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong, see the console!" });
  }
};
