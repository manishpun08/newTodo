import mongoose from "mongoose";

// Set Rule
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    max_length: 55,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    max_length: 55,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    max_length: 55,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
    enum: ["male", "female", "other"],
  },
});
userSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

// Create table
const User = mongoose.model("User", userSchema);
export default User;
