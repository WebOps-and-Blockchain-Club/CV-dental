const express = require('express');
const router = express.Router();

const xrayController = require('../Controller/xray_controller');

router.post('/addxray',xrayController.addXray);
router.delete('/deletexray', xrayController.deleteXray);
router.put('/editxray', xrayController.editXray);
router.get('/getallxray', xrayController.getAllXray);
router.get('/getxray', xrayController.getXrayByID);

module.exports = router;