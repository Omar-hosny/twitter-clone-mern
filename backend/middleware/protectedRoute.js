import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
  // check for token in cookies
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }
  //   verify token with secret key
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  if (!decodedToken) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
  //   get user from db and attach to req.user
  const user = await User.findById(decodedToken.userId);
  if (!user) {
    return res.status(401).json({ error: "Unauthorized - User not found" });
  }
  //   attach user to request object
  req.user = user;
  //   call next middleware function
  next();
};
