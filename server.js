// server.js
import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware FIRST
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Helper: load projects
function loadProjects() {
  const raw = fs.readFileSync("./public/projects.json", "utf-8");
  return JSON.parse(raw);
}

// API ROUTE FIRST (before catch-all)
app.get("/api/:slug", (req, res) => {
  const { slug } = req.params;
  const projects = loadProjects();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
});

// CATCH-ALL ROUTE LAST (serves index.html for ANY slug)
app.get("*", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running: http://localhost:${PORT}`);
  console.log(`🔗 Test: http://localhost:${PORT}/movement-system`);
});
