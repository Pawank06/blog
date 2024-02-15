import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { postsRoutes } from "./routes/post.route.js";
import { usersRoutes } from "./routes/user.route.js";
import cors from 'cors';
import 'dotenv/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', "https://mern-task-app-8nct.onrender.com"],
  credentials: true
}));
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// Serve static files from the 'frontend/build' directory
app.use(express.static(join(__dirname, "frontend/build")));

// Serve the same HTML file for all routes
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "frontend/build", "index.html"));
});

mongoose
  .connect(process.env.MONGODB_URI, { dbName: 'blogapp', useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB successfully");
    const port = process.env.PORT || 4000;
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
