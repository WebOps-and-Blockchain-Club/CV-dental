const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./Config/config.env" });
const path = require("path");
const WebSocket = require('ws');
const xrayController = require('./Controller/xray_controller');
const http = require('http');
const server = http.createServer(app);
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
server.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
}
);


