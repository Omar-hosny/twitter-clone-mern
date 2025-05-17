import express from "express";
import {
  followUnfollowUser,
  getSuggestedUsers,
  getUserProfile,
  searchUser,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/profile/:username", protectedRoute, getUserProfile);
router.post("/follow-unfollow/:id", protectedRoute, followUnfollowUser);
router.get("/suggested-users", protectedRoute, getSuggestedUsers);
router.put("/update-user", protectedRoute, updateUserProfile);
router.get("/search", protectedRoute, searchUser);

export default router;
