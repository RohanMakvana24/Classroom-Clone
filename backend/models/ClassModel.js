import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  className: {
    type: String,
    required: [true, "Classname is required"],
    trim: true,
    minLength: [5, "className must be at least 5 character long"],
  },
  section: {
    type: String,
    trim: true,
    minLength: [5, "The Section must be aleast 5 character long"],
  },
  subject: {
    type: String,
    trim: true,
    minLength: [5, "The Subject must be aleast 5 character long"],
  },
  room: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  classType: {
    type: String,
    enum: ["join", "create"],
  },
});
