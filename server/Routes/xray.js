const express = require("express");
const router = express.Router();

const xrayController = require("../Controller/xray_controller");

router.post("/addxray", xrayController.addPatientData);

router.get("/getallxray:patientId", xrayController.getPatientData);

router.get("/getxray", xrayController.downloadXray);
router.get("/dummyApi", xrayController.dummyApi);
router.get("/patientcount", xrayController.getPatientCount);
router.get("/getappointments/:patientId", xrayController.getAppointments);
router.get("/getteethdetails/:patientId", xrayController.getTeethDetails);
router.get("/searchpatientsbyname/:query", xrayController.searchPatientsByName);
router.get("/getalldata", xrayController.getAllData);
module.exports = router;
