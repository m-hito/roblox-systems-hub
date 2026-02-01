import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

// Middleware FIRST
app.use(cors());
app.use(express.json());
app.use(express.static("../public"));  // ← Changed path

// Helper: load projects
function loadProjects() {
  const raw = fs.readFileSync("./../public/projects.json", "utf-8");  // ← Changed path
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

// CATCH-ALL ROUTE LAST (SPA routing)
app.get("*", (req, res) => {
  res.sendFile(path.resolve("../public/index.html"));  // ← Changed path
});

// REQUIRED FOR VERCEL: Export app
module.exports = app;  // ← ADD THIS LINE
