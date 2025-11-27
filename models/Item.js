import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  type: { type: String, required: true }, // lost or found
  itemName: String,
  location: String,
  description: String,
  contact: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Item", itemSchema);
