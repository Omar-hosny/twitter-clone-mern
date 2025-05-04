import express from "express";
import dotenv from "dotenv";

// routes
import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";

import connectDb from "./db/connectDB.js";
import cookieParser from "cookie-parser";

dotenv.config();
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // connetion to database
  connectDb();
});
