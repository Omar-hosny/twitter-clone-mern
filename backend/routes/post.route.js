import express from "express";
import {
  commentOnPost,
  createPost,
  deleteCommentFromPost,
  deletePost,
  getAllPosts,
  getFollowingPosts,
  getLikedPosts,
  getUserPosts,
  likeUnlikePost,
} from "../controllers/post.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.post("/create", protectedRoute, createPost);
router.delete("/delete/:id", protectedRoute, deletePost);
router.post("/like-unlike/:id", protectedRoute, likeUnlikePost);
router.post("/add-comment/:id", protectedRoute, commentOnPost);
router.delete(
  "/delete-comment/:postId/:commentId",
  protectedRoute,
  deleteCommentFromPost
);
router.get("/liked-posts/:id", protectedRoute, getLikedPosts);
router.get("/following-posts", protectedRoute, getFollowingPosts);
router.get("/all", protectedRoute, getAllPosts);
router.get("/user-posts/:username", protectedRoute, getUserPosts);

export default router;
