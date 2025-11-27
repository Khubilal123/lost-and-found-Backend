import express from "express";
import upload from "../middleware/upload.js";
import { addItem, getItems, deleteItem } from "../controllers/itemsController.js";

const router = express.Router();

router.post("/", upload.single("image"), addItem);
router.get("/", getItems);
router.delete("/:id", deleteItem);

export default router;
