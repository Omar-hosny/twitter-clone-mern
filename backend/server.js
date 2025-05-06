import express from "express";
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
// routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import notificationRoute from "./routes/notification.route.js";

// connect to db
import connectDb from "./db/connectDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
// initialize cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// initialize express app
const app = express();

const PORT = process.env.PORT || 5000;
// middleware
app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)
app.use(cookieParser()); // to parse cookies from req.cookies

// routes
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/notifications", notificationRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // connetion to database
  connectDb();
});
