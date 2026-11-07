
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "30kb" }));

app.get("/api/status", (req, res) => {
  res.json({
    name: "NEXUS AI",
    status: "ONLINE"
  });
});

// Chat API
app.post("/api/chat", (req, res) => {
  try {
    const messages = req.body.messages;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid messages"
      });
    }

    const lastMessage = messages[messages.length - 1];

    if (!lastMessage) {
      return res.status(400).json({
        error: "No message received"
      });
    }

    res.json({
      reply: "پیامت به NEXUS AI رسید! ارتباط سرور با موفقیت برقرار شد. برای فعال شدن هوش مصنوعی واقعی باید موتور هوشمند را متصل کنیم."
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("NEXUS AI running on port " + PORT);
});
