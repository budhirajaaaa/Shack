import express from "express";
import {
  comment,
  createPost,
  getAllPost,
  likePost,
} from "../controllers/postController.js";
import upload from "../middleware/upload.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/createPost", authMiddleware, upload.single("image"), createPost);
router.get("/getAllPost", authMiddleware, getAllPost);
router.post("/likepost/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, comment);

export default router;
