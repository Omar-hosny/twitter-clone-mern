import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      //   select: false, // This will not be returned when querying the user model.
      minLength: 6,
      //   select: false, // This will not be returned when querying the user model.
    },
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    bio: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },

  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
