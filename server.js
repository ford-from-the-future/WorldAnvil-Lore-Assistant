import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import axios from "axios";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;

// --- static build (your React app) ---
app.use(express.static("dist"));

// --- middleware ---
app.use(cors());
app.use(express.json());

// --- your proxy endpoint ---
app.post("/api/proxy", async (req, res) => {
  const { appKey, authToken, worldId } = req.body;
  try {
    const response = await axios.get(
      `https://www.worldanvil.com/api/external/boromir/world/${worldId}?granularity=1`,
      { headers: { appKey, authToken } }
    );
    res.json(response.data);
  } catch (err) {
    res
      .status(err.response?.status || 500)
      .json({ error: err.message || "Unknown error" });
  }
});

// --- fallback route for SPA ---
app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
});
