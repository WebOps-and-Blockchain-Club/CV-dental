const mongoose = require("mongoose");

const xraySchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
  },
  xray_url: {
    type: "string",
    default: "",
  },
  patient_id: {
    type: "string",
    required: true,
  },
});

const Xray = mongoose.model("Xray", xraySchema);
module.exports = Xray;
