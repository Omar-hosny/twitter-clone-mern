import Notification from "../models/Notification.model.js";

// Get all notifications for a user.
export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "from",
        select: "username profileImage name",
      });
    await Notification.updateMany(
      { to: userId, isRead: false },
      { $set: { isRead: true } }
    );
    return res.status(200).json(notifications);
  } catch (error) {
    console.log("Error in getting notifications", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// delete all notification
export const deleteNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });
    return res
      .status(200)
      .json({ message: "All notifications deleted successfully" });
  } catch (error) {
    console.log("Error in deleting notifications", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
