import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.route.js";
import connectDb from "./db/connectdb.js";

dotenv.config();

const app = express();

app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // connetion to database
  connectDb();
});
