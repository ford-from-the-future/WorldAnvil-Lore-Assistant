// server.js
import express from "express";
import path from "path";
import cors from "cors";
import axios from "axios";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 8080;
const __dirname = path.resolve();

// Parse JSON bodies
app.use(express.json());

// Lock CORS to your site(s) in prod; allow all locally
const allowlist = (process.env.CORS_ORIGIN || "").split(",").filter(Boolean);
app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowlist.length === 0 || allowlist.includes(origin)) return cb(null, true);
      return cb(new Error("Blocked by CORS"));
    },
  })
);

// Replace your existing Boromir route with this:
app.post("/api/boromir/world/:worldId", async (req, res) => {
  try {
    const { worldId } = req.params;
    const { appKey, authToken } = req.body || {};

    if (!worldId) return res.status(400).json({ error: "Missing worldId" });
    if (!appKey || !authToken) return res.status(400).json({ error: "Missing appKey or authToken" });

    const url = `https://www.worldanvil.com/api/external/boromir/world/${encodeURIComponent(worldId)}?granularity=1`;

    const wa = await axios.get(url, {
      headers: {
        'x-application-key': appKey,
        'x-auth-token': authToken,
        'Content-Type': 'application/json'
      },
      validateStatus: () => true,
    });

    if (wa.status < 200 || wa.status >= 300) {
      return res.status(wa.status).json({
        error: wa.data?.message || `World Anvil returned ${wa.status}`,
      });
    }

    res.json(wa.data);
  } catch (err) {
    console.error("Boromir proxy error:", err);
    res.status(500).json({ error: "Failed to reach World Anvil" });
  }
});

// AI endpoint: runs on the server, using env var
app.post("/api/ai", async (req, res) => {
  try {
    const { context, question } = req.body || {};
    if (!question) return res.status(400).json({ error: "Missing 'question'" });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not set" });

    const ai = new GoogleGenAI({ apiKey });
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const resp = await model.generateContent([
      { role: "user", parts: [{ text: `${context || ""}\n\nQ: ${question}` }] }
    ]);
    const text = resp?.response?.text?.() ?? "";
    res.json({ text });
  } catch (err) {
    console.error("AI error:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

// ---- Static files (Vite build) ----
app.use(express.static("dist"));
app.get("*", (_, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));

// (Optional) Cloud Run health check
app.get("/_ah/health", (_, res) => res.status(200).send("ok"));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
