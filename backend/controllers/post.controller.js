import mongoose from "mongoose";
import { Post } from "../models/post.models.js";
import { User } from "../models/user.models.js";

/************************ Getting All Post *************************/
const getPosts = async (req, res) => {
  try {
    // returns all the posts for us
    const posts = await Post.find().sort({ createdAt: "desc"});
    res.status(200).json({ posts });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

/************************ Getting Single Post *************************/

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) throw new Error("Post not found");
    res.status(200).json({ post });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
/************************ Getting User Post *************************/


const getUserPosts = async (req, res) => {
  // Grab the authenticated user from request object
  const user = await User.findById(req.user._id);

  try {
    // Grab user's posts from DB
    const userPosts = await Post.find({ user: user._id }).sort({ createdAt: "desc" });
    res.status(200).json({ userPosts, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/************************ Create Post *************************/

const createPost = async (req, res) => {
  // grab the data from request body
  const { title, body } = req.body;

  // check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are requires" });
  }

  // Grab the authenticated user from request body
  const user = await User.findById(req.user._id);

  try {
    const post = await Post.create({ user: user._id, title, body });

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/************************ Delete Post *************************/

const deletePost = async (req, res) => {
  // check the ID is valid type
  const isvalidId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isvalidId) {
    res.status(400).json({ error: "Invalid ID" });
  }

  //Check the post is exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

  // check the user is the owner of the post

  const user = await User.findById(req.user._id)
  if(!post.user.equals(user._id)) {
    return res.status(401).json({error: "Not authorized"})
  }

  try {
    await post.deleteOne();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/************************ Update Post *************************/

const updatePost = async (req, res) => {
  // grab the data from request body
  const { title, body } = req.body;

  // check the fields are not empty
  if (!title || !body) {
    return res.status(400).json({ error: "All fields are requires" });
  }

  // check the ID is valid type
  const isvalidId = mongoose.Types.ObjectId.isValid(req.params.id);

  if (!isvalidId) {
    res.status(400).json({ error: "Invalid ID" });
  }

  //Check the post is exist
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: "Post not found" });
  }

   // check the user is the owner of the post

   const user = await User.findById(req.user._id)
   if(!post.user.equals(user._id)) {
     return res.status(401).json({error: "Not authorized"})
   }

  try {
    await post.updateOne({ title, body });
    res.status(200).json({ message: "Post updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPosts, getSinglePost, createPost, deletePost, updatePost, getUserPosts };
