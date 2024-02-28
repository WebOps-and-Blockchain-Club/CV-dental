const mongoose = require("mongoose");

const xraySchema = new mongoose.Schema({
  xray_url: {
    type: "string",
    default: "",
  },
  details : {
    type : "objects",
    default : {},
  }
});

const Xray = mongoose.model("Xray", xraySchema);
module.exports = Xray;
