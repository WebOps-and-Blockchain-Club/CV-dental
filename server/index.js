const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });
const path = require("path");
const WebSocket = require('ws');
const xrayController = require('./Controller/xray_controller');

// Import Express routes
const routes = require("./Routes");

// Import MongoDB connection
require("./Config/mongoConnection");

// Use Express routes
app.use("/", routes);

// Serve static files
app.use(express.static(path.join(__dirname, "../client/public")));

// Start Express server
const port = process.env.PORT;
const server = app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});

// Initialize WebSocket server
console.log("server ws working 1");
const wss = new WebSocket.Server({ server });
console.log("server ws working 2");
wss.on('connection', (ws) => {
    console.log("server ws working");
    ws.on('message', async (message) => {
        const data = JSON.parse(message);

        const patientId = data.patientId;

        try {
            const patientData = await xrayController.getPatientData({ params: { patientId } });

            ws.send(JSON.stringify(patientData));
        } catch (error) {
            console.error('Error retrieving patient data:', error);
            ws.send(JSON.stringify({ error: 'Error retrieving patient data' }));
        }
    });
});

// Handle WebSocket server errors
wss.on('error', (error) => {
    console.error('WebSocket server error:', error);
});
