import cors from "cors";
import express from "express";

const app = express();

// Các middleware
app.use(cors());
app.use(express.json());

// Tuyến cơ bản
app.get("/", (_req, res) => {
  res.send("Máy chủ đang chạy!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
});
