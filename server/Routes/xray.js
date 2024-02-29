const express = require("express");
const router = express.Router();

const xrayController = require("../Controller/xray_controller");

router.post("/addxray", xrayController.addPatientData);
router.get("/getallxray", xrayController.getPatientData);
router.get("/getxray", xrayController.downloadXray);
router.get("/dummyApi", xrayController.dummyApi);

module.exports = router;