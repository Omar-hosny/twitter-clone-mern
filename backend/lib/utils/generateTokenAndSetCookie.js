import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    maxAge: 3600 * 1000, // 1 hour in milliseconds
    sameSite: "strict",
  });
};
