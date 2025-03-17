const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require('cors');


const app = express();
const port = 3000;
const dataFile = "EmergencyCalls.json";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Load EmergencyCalls from JSON file
const loadData = () => {
    try {
        const data = fs.readFileSync(dataFile, "utf8");
        return JSON.parse(data);
    } catch (error) {
        return []; // Return empty array if file doesn't exist or is unreadable
    }
};

// Save EmergencyCalls to JSON file
const saveData = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
};

// GET: Retrieve all EmergencyCalls
app.get("/api/EmergencyCalls", (req, res) => {
    res.json(loadData());
});

// POST: Add a new EmergencyCalls
app.post("/api/EmergencyCalls", (req, res) => {
    let EmergencyCalls = loadData();
    const newEmergencyCalls = {
        id: Date.now().toString(), // Ensuring ID is a string
        zip: req.body.zip,
        type: req.body.type
    };

    EmergencyCalls.push(newEmergencyCalls);
    saveData(EmergencyCalls);

    res.json({ message: "EmergencyCalls added", EmergencyCalls: newEmergencyCalls });
});

// PUT: Update a EmergencyCalls
app.put("/api/EmergencyCalls/:id", (req, res) => {
    let EmergencyCalls = loadData();
    const EmergencyCallsIndex = EmergencyCalls.findIndex(s => s.id === req.params.id);

    if (EmergencyCallsIndex !== -1) {
        EmergencyCalls[EmergencyCallsIndex] = { ...EmergencyCalls[EmergencyCallsIndex], ...req.body };
        saveData(EmergencyCalls);
        res.json({ message: "EmergencyCalls updated", EmergencyCalls: EmergencyCalls[EmergencyCallsIndex] });
    } else {
        res.status(404).json({ message: "EmergencyCalls not found" });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});