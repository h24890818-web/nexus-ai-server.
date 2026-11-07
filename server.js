
const express = require("express");
const cors = require("cors");
const { rateLimit } = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(express.json({ limit: "30kb" }));

app.use("/api/", rateLimit({
  windowMs: 60000,
  limit: 15
}));

app.get("/", (req, res) => {
  res.json({
    name: "NEXUS AI",
    status: "ONLINE"
  });
});

app.post("/api/chat", async (req, res) => {
  try {
    const key = process.env.OPENROUTER_API_KEY;
    const messages = req.body.messages;

    if (!key) {
      return res.status(500).json({
        error: "API key missing"
      });
    }

    if (!Array.isArray(messages) ||
        messages.length === 0 ||
        messages.length > 20 ||
        !messages.every(m =>
          m &&
          ["user", "assistant"].includes(m.role) &&
          typeof m.content === "string" &&
          m.content.length <= 4000
        )) {
      return res.status(400).json({
        error: "Invalid messages"
      });
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
          "X-Title": "NEXUS AI"
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: "You are NEXUS AI, a helpful Persian-speaking assistant. Answer naturally in Persian."
            },
            ...messages
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(502).json({
        error: "AI provider error"
      });
    }

    res.json({
      reply: data.choices?.[0]?.message?.content || "No response"
    });

  } catch (error) {
    res.status(500).json({
      error: "Server error"
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("NEXUS AI ONLINE");
});
