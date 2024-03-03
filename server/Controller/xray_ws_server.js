const WebSocket = require('ws');
const xrayController = require('../Controller/xray_controller');

module.exports = function(server) {
    console.log("server ws working");
    const wss = new WebSocket.Server({ server });

    // WebSocket connection handling
    wss.on('connection', (ws) => {
      //  console.log("server ws working");
        // Listen for messages from the client
        ws.on('message', async (message) => {
            console.log("server ws working");
            // Parse incoming message
            const data = JSON.parse(message);

            // Extract patient ID
            const patientId = data.patientId;

            // Call the controller function to get patient data
            try {
                const patientData = await xrayController.getPatientData({ params: { patientId } });

                // Send patient data back to the client
                ws.send(JSON.stringify(patientData));
            } catch (error) {
                console.error('Error retrieving patient data:', error);
                // Send an error message back to the client if something goes wrong
                ws.send(JSON.stringify({ error: 'Error retrieving patient data' }));
            }
        });
    });

    // Handle WebSocket server errors
    wss.on('error', (error) => {
        console.error('WebSocket server error:', error);
    });
};
