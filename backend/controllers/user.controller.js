import mongoose from "mongoose";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";

// get user profile controller function
export const getUserProfile = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error in getting user profile", error.message);
    return res.status(500).json({ error: "Internal server error occurred" });
  }
};

// follow / unfollow controller functions
export const followUnfollowUser = async (req, res) => {
  const { id } = req.params;

  // check if id is valid mongoose ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // console.log(req.user._id.toString() , id
    const userToModify = await User.findById(id);
    console.log("userToModify:", userToModify);

    const currentUser = await User.findById(req.user._id);
    console.log("currentUser:", currentUser);

    if (!userToModify || !currentUser) {
      return res.status(404).json({ error: "User not found" });
    }
    //   check if user is trying to follow himself
    if (id === req.user._id.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    }

    //   check if user already following the userToModify
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      // UNFOLLOW LOGIC

      await User.findByIdAndUpdate(
        id,
        { $pull: { followers: currentUser._id } },
        { new: true }
      );
      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { following: id } },
        { new: true }
      );
      return res.status(200).json({ message: "User unfollowed successfully" });
    } else {
      // FOLLOW USER LOGIC

      await User.findByIdAndUpdate(id, {
        $push: { followers: currentUser._id },
      });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      const notification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await notification.save();
      return res.status(200).json({ message: "User followed successfully" });
    }
  } catch (error) {
    console.log("Error following/unfollowing user", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// get suggestions for users to follow
export const getSuggestedUsers = async (req, res) => {
  try {
    const userId = req.user._id;
    // check if id is valid mongoose id
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    // check if user exists in database
    const user = await User.findById(userId).select("following");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // convert following id to ObjectIds (incase they are strings)
    const followingIds = user.following.map(
      (id) => new mongoose.Types.ObjectId(id)
    );
    console.log(followingIds);
    // excludes IDs
    const excludedIds = [...followingIds, new mongoose.Types.ObjectId(userId)];
    // get users that are not in excludedIds array
    const suggestedUsers = await User.aggregate([
      { $match: { _id: { $nin: excludedIds } } },
      { $sample: { size: 4 } },
      { $project: { password: 0, __v: 0 } }, // exclude password and version field
    ]);

    // return suggested users as json response
    return res.status(200).json(suggestedUsers);
  } catch (error) {
    // log error and send response with error message
    console.log("Error getting suggested users", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// update user profile controller function
export const updateUserProfile = async (req, res) => {};
