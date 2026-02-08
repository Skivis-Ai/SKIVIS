const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const dataFile = path.join(__dirname, "scans.json");

// Health check API
app.get("/api/status", (req, res) => {
  res.json({ message: "Skivis backend is running" });
});

// Save AI scan result
app.post("/api/save-scan", (req, res) => {
  const scan = {
    result: req.body.result || "Unknown",
    time: new Date().toLocaleString()
  };

  let data = [];
  if (fs.existsSync(dataFile)) {
    data = JSON.parse(fs.readFileSync(dataFile));
  }

  data.push(scan);
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));

  res.json({ message: "Scan saved successfully" });
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
