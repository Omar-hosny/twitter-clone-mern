import { generateTokenAndSetCookie } from "../lib/utils/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

//  signup controller function
export const signup = async (req, res) => {
  const { name, email, password, username } = req.body;
  if (!name || !email || !password || !username) {
    // controllers/auth.controllers.js
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    // email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }
    // check if user already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(409).json({ error: "username already exists" });
    }
    // existing user by email
    // check if user already exists by email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(409).json({ error: "Email already exists" });
    }
    // check if password is strong enough
    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    if (!newUser) {
      return res
        .status(400)
        .json({ error: "Error creating new user or invalid data" });
    }
    // save new user to database and generate token to set cookie on the server
    // generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();
    return res.status(201).json({ message: "User created successfully" });
    // create new user
  } catch (error) {
    console.log("Error signing up controller: ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error Error signing up" });
  }
};

// login controller function

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const correctedPassword = await bcrypt.compare(password, user.password);
    if (!correctedPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    generateTokenAndSetCookie(user._id, res);
    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        following: user.following,
        followers: user.followers,
        coverImage: user.coverImage,
        bio: user.bio,
        linl: user.link,
      },
    });
  } catch (error) {
    console.log("Error signing in controller: ", error.message);
    return res
      .status(500)
      .json({ error: "Internal server error Error signing in" });
  }
};

// logout controller function
export const logout = async (_req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error logout controller: ", error.message);
    res.status(500).json({ error: "Internal server error Error logging out" });
  }
};
export const getMe = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log("Error getting me in controller: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
