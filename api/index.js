import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());

function loadProjects() {
  const projectsPath = path.join(process.cwd(), "public/projects.json");
  const raw = fs.readFileSync(projectsPath, "utf-8");
  return JSON.parse(raw);
}

// IMPORTANT: route is "/:slug", NOT "/api/:slug"
app.get("/:slug", (req, res) => {
  const { slug } = req.params;

  const projects = loadProjects();
  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return res.status(404).json({ error: "Project not found" });
  }

  res.json(project);
});

export default app;
