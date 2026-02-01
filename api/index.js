import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));  // ✅ FIXED

function loadProjects() {
  const projectsPath = path.join(process.cwd(), "public/projects.json");
  const raw = fs.readFileSync(projectsPath, "utf-8");
  return JSON.parse(raw);
}

app.get("/api/:slug", (req, res) => {
  const { slug } = req.params;
  const projects = loadProjects();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }
  res.json(project);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/index.html"));
});

module.exports = app;  // ✅ REQUIRED
