import mongoose from "mongoose";
import User from "./User.js";
const postSchema = mongoose.Schema({
  title: { type: String, require: true },
  content: { type: String },
  image: { type: String },
  author: { type: mongoose.Schema.Types.ObjectId, ref: User, require: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: User }],
  comment: [
    {
      content: { type: String, require: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: User, require: true },
      createdAt: { type: Date, default: Date.now() },
    },
  ],
  createdAt: { type: Date, default: Date.now() },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
