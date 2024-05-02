import mongoose from "mongoose";
const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "unverified_user",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    refreshToken: {
        type: String,
      },
});
export default model("User", userSchema);