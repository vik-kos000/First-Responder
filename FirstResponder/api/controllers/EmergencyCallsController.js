const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "../../api/data/emergencyCalls.json");

// Function to load emergency calls
const loadData = () => {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, "[]", "utf8"); // Create file if missing
    }
    const data = fs.readFileSync(dataFile, "utf8");
    return JSON.parse(data.length ? data : "[]"); // Handle empty file
  } catch (error) {
    sails.log.error("Error reading emergency calls file:", error);
    return [];
  }
};

// Function to save emergency calls
const saveData = (data) => {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    sails.log.error("Error saving emergency calls:", error);
  }
};

module.exports = {
  getEmergencyCalls: function (req, res) {
    return res.json(loadData());
  },

  addEmergencyCall: function (req, res) {
    let emergencyCalls = loadData();
    const newCall = {
      id: Date.now().toString(),
      zip: req.body.zip,
      type: req.body.type,
    };

    emergencyCalls.push(newCall);
    saveData(emergencyCalls);

    return res.json({ message: "Emergency call added", emergencyCall: newCall });
  },
};
