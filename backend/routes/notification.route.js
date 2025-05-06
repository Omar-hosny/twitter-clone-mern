import express from "express";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notification.controller.js";
import { protectedRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/", protectedRoute, getNotifications);
router.delete("/", protectedRoute, deleteNotification);

export default router;
