import express from "express";
import mongoose from "mongoose";
import { postsRoutes } from "./routes/post.route.js";
import { usersRoutes } from "./routes/user.route.js";
import cors from 'cors'
import 'dotenv/config.js'

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Specify the allowed origin
  methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE"], // Specify the allowed HTTP methods
  credentials: true // Allow credentials (cookies)
}));
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.get("/", (req, res) => {
  res.send("Hello World");
})

mongoose
  .connect(process.env.MONGODB_URI, {dbName: 'blogapp'})
  .then(() => {
    console.log("connected to DB sucessfully");
    app.listen(4000, () => console.log("Server is running on port 4000"));
  })
  .catch((err) => {
    console.log("Failed to connect MONGODB : ", err);
  });