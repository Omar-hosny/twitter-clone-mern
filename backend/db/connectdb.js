import mongoose from "mongoose";

// connect to database
const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.error("Error connecting to MongoDB", error.message);
    process.exit(1);
  }
};
export default connectDb;
