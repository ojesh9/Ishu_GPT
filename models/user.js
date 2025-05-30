import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: false }
  },
  { timestamps: true }
);

const User =mongoose.model.user || mongoose.model("user", UserSchema)

export default User;