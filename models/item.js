import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  imageUrl: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Item", itemSchema);
