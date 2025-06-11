import Post from "../model/Post.js";
import mongoose from "mongoose";
export const createPost = async (req, res) => {
  try {
    console.log("create post");
    const { title, content } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const post = await Post.create({
      title,
      content,
      image,
      author: req.user.id,
    });
    console.log("post saved");
    res.status(201).json(post);
  } catch (err) {
    console.log(`Error in saving Post ${err}`);
    res.status(500).json({ msg: "Error creating post" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const allPost = await Post.find({})
      .populate("author comment.user")
      .sort({ createdAt: -1 });
    console.log(allPost);
    res.json(allPost);
  } catch (err) {
    console.log(err);
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author comment.user"
    );
    if (!post) res.json({ message: "No Post exist with given id exist" });
    const hasLiked = post.likes.some((id) => id.toString() === req.user.id);
    if (hasLiked) {
      post.likes = post.likes.filter(
        (e) => e.toString() !== req.user.id.toString()
      );
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: `Error:${error}` });
  }
};

export const comment = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("author comment.user");
    if (!post) res.status(404).json({ message: "No post with given id exist" });
    const { comment } = req.body;
    post.comment.push({
      user: new mongoose.Types.ObjectId(req.user.id),
      content: comment,
    });
    await post.save();
    const newPost = await Post.findById(post._id).populate(
      "author comment.user"
    );
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json({ message: `Error in Commenting err:${error}` });
  }
};
