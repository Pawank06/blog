import express from "express";
import { createPost, deletePost, getPosts, getSinglePost, getUserPosts, updatePost } from "../controllers/post.controller.js";
import auth from "../middlewares/auth.middleware.js";
const router = express.Router();


// getting all the posts
router.get('/', getPosts)

// getting single post
router.get('/post/:id', getSinglePost)

// Get User Posts
router.get('/user', auth, getUserPosts)

// creating new post
router.post("/", auth, createPost);

// Deleting a post
router.delete("/:id", auth, deletePost);

// updating a post
router.put("/:id", auth, updatePost);

export { router as postsRoutes };
