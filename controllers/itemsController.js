import Item from "../models/item.js";   
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

export const addItem = async (req, res) => {
  try {
    let imageUrl = "";

    if (req.file) {
      const upload = await cloudinary.v2.uploader.upload_stream(
        { folder: "lost-found" },
        (error, result) => {
          if (error) return res.status(500).json({ error });
          imageUrl = result.secure_url;
        }
      );

      upload.end(req.file.buffer);
    }

    const item = await Item.create({
      ...req.body,
      image: imageUrl
    });

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getItems = async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
};

export const deleteItem = async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
};
