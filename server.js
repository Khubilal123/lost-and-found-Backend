import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import itemsRouter from "./src/routes/items.js";  

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

app.use("/api/items", itemsRouter);

app.get("/", (req, res) => {
  res.send("Lost & Found API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
