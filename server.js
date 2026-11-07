
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "30kb" }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/api/status", (req, res) => {
  res.json({
    name: "NEXUS AI",
    status: "ONLINE"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("NEXUS AI is running on port " + PORT);
});
