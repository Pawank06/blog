import express from "express";
import mongoose from "mongoose";
import { postsRoutes } from "./routes/post.route.js";
import { usersRoutes } from "./routes/user.route.js";
import cors from 'cors'
import 'dotenv/config.js'
import path from 'path'; // Import the 'path' module

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', "https://mern-task-app-8nct.onrender.com"], // Specify the allowed origin
  credentials: true // Allow credentials (cookies)
}));
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.static(path.join(__dirname, "frontend/build"))); // Adjust the path to match your frontend build output directory

// Your other route handlers and middleware

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html")); // Adjust the path to match your frontend build output directory
});

mongoose
  .connect(process.env.MONGODB_URI, {dbName: 'blogapp'})
  .then(() => {
    console.log("connected to DB sucessfully");
    app.listen(4000, () => console.log("Server is running on port 4000"));
  })
  .catch((err) => {
    console.log("Failed to connect MONGODB : ", err);
  });

// Serve static files from the 'build' directory (assuming your production build is located there)
app.use(express.static('build'));

// Serve the same HTML file for all routes
