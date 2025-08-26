import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  creditBalance: { type: Number, default: 5 }
});

// Use "User" as the model name
const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
