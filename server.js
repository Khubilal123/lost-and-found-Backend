import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./src/routes/items.js";   

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/items", itemsRouter);

// Test route
app.get("/", (req, res) => {
  res.send("Lost & Found API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
