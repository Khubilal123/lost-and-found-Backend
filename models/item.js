import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
  location: String,
  contact: String,
  type: String, // lost or found
  image: String, // matches your controller
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Item", itemSchema);
