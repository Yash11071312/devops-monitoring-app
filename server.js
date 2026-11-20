const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "DevOps Monitoring App";

app.get("/", (req, res) => {
    console.log("Homepage accessed");

    res.send(`
        <h1>${APP_NAME}</h1>
        <p>Application is running successfully!</p>
    `);
});

app.get("/health", (req, res) => {
    console.log("Health check performed");

    res.json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date()
    });
});

app.get("/info", (req, res) => {
    res.json({
        application: APP_NAME,
        environment: process.env.NODE_ENV || "development",
        port: PORT
    });
});

app.get("/crash", (req, res) => {
    console.log("Crash endpoint triggered!");

    process.exit(1);
});

app.listen(PORT, () => {
    console.log(`${APP_NAME} running on port ${PORT}`);
});