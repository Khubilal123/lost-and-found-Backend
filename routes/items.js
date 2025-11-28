import express from "express";
import upload from "../middleware/upload.js";
import { addItem, getItems, deleteItem } from "../controllers/itemsController.js";

const router = express.Router();

router.post("/", upload.single("image"), addItem);
router.get("/", getItems);
router.delete("/:id", (req, res) => {
  const adminKey = req.headers ["x-admin-key"];

  if (adminKey !== process.env.ADMIN_KEY) {
    return res.status(403).json({ message: "Unauthorized: Admin key invalid" });
  }

  deleteItem(req, res);
});

export default router;
