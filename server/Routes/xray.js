const express = require("express");
const router = express.Router();

const xrayController = require("../Controller/xray_controller");

router.post("/addxray", xrayController.addXray);
router.get("/getallxray", xrayController.getAllXrayofPatient);
router.get("/getxray", xrayController.downloadXray);
router.get("/dummyApi", xrayController.dummyApi);

module.exports = router;
