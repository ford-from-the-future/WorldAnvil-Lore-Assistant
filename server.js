// server.js
import express from "express";
import path from "path";
import cors from "cors";
import axios from "axios";

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

// ---- API proxy: World Anvil Boromir ----
// Keep secrets on the server; don't ship them to the browser.
app.post("/api/boromir", async (req, res) => {
  try {
    const worldId = req.body?.worldId || process.env.WORLD_ID;
    if (!worldId) return res.status(400).json({ error: "Missing worldId" });
    const r = await axios.get(
      `https://www.worldanvil.com/api/external/boromir/world/${worldId}?granularity=1`,
      {
        headers: {
          appKey: process.env.APP_KEY,
          authToken: process.env.AUTH_TOKEN,
        },
      }
    );
    res.json(r.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
});

// ---- Static files (Vite build) ----
app.use(express.static("dist"));
app.get("*", (_, res) => res.sendFile(path.join(__dirname, "dist", "index.html")));

// (Optional) Cloud Run health check
app.get("/_ah/health", (_, res) => res.status(200).send("ok"));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
