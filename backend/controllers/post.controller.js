import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import Notification from "../models/notification.model.js";

export const createPost = async (req, res) => {
  try {
    const { text } = req.body;
    let { image } = req.body;
    const userId = req.user.id.toString();
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!text && !image) {
      return res
        .status(400)
        .json({ message: "Please provide either text or image. " });
    }
    // check if image is provided
    if (image) {
      const imageResponse = await cloudinary.uploader.upload(image, {
        folder: "posts",
      });
      image = imageResponse.secure_url;
    }
    const newPost = await Post.create({
      user: userId,
      text,
      image,
    });
    return res.status(201).json(newPost);
  } catch (error) {
    console.log("Error creating post", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// delete a post
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }
    await Post.findByIdAndDelete(id);
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log("Error deleting post", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
// like - unlike a post
export const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user._id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const islikedPost = post.likes.includes(userId);
    if (islikedPost) {
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } });
      await User.findByIdAndUpdate(
        { _id: userId },
        { $pull: { likedPosts: postId } }
      );
      // // remove notification if the user unliked the post
      // await Notification.findOneAndDelete({
      //   from: userId,
      //   to: post.user,
      //   type: "like",
      // });

      return res.status(200).json({ message: "Post unliked successfully" });
    } else {
      await Post.updateOne({ _id: postId }, { $push: { likes: userId } });
      await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { likedPosts: postId } }
      );
      // send notification to the post owner that someone liked their post
      const notification = new Notification({
        from: userId,
        to: post.user,
        type: "like",
      });
      await notification.save();

      return res.status(200).json({ message: "Post liked successfully" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

// comment on post
export const commentOnPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const text = req.body.text;
    const userId = req.user._id;
    if (!text) {
      return res.status(400).json({ error: "Text field is required" });
    }

    const post = await Post.findById({ _id: postId });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const comment = { user: userId, text };
    post.comments.push(comment);
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error commenting on post", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a comment from a post
export const deleteCommentFromPost = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.user._id;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const commentExists = post.comments.some(
      (comment) => comment._id.toString() === commentId
    );

    if (!commentExists) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // find the comment by id and user id
    const isUserOwnsComment = post.comments.find(
      (comment) => comment.user.toString() === userId.toString()
    );

    if (!isUserOwnsComment) {
      return res
        .status(403)
        .json({ message: "You are Not authorized to delete comment" });
    }

    // Use $pull with commentId and userId to ensure the user owns the comment
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId, user: userId } } },
      { new: true }
    );

    if (!updatedPost) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete comment" });
    }

    return res.status(200).json({
      message: "Comment deleted successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// get liked posts
export const getLikedPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Use $in operator to find all posts with _id in user.likedPosts array
    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "user",
        select: "-password -email -createdAt -updatedAt -likedPosts -__v",
      })
      .populate({
        path: "comments.user",
        select: "-password -email -createdAt -updatedAt -likedPosts -__v",
      });
    return res.status(200).json(likedPosts);
  } catch (error) {
    console.error("Error retrieving liked posts:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// get following posts
export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const following = user.following;
    const followingPosts = await Post.find({
      user: { $in: following },
    })
      .populate({
        path: "user",
        select: "-password -email -createdAt -updatedAt -likedPosts -__v",
      })
      .populate({
        path: "comments.user",
        select: "-password -email -createdAt -updatedAt -likedPosts -__v",
      });
    return res.status(200).json(followingPosts);
  } catch (error) {
    console.log("Error retrieving following posts:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// get user posts

export const getUserPosts = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password -email -createdAt -updatedAt -likedPosts -__v",
      })
      .populate({
        path: "comments.user",
        select: "-password -email -createdAt -updatedAt -likedPosts -__v",
      });

    res.status(200).json(posts);
  } catch (error) {
    console.log("Error in getUserPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password -email -createdAt -updatedAt -likedPosts -__v",
      })
      .populate({
        path: "comments.user",
        select: "-password -email -createdAt -updatedAt -likedPosts -__v",
      });
    if (posts.length === 0) {
      return res.status(200).json([]);
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log("Error retrieving posts:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
