import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import ownerRouter from "./routes/ownerRoutes.js";
import userRouter from "./routes/userRoutes.js";

// Load biến môi trường
dotenv.config();

const app = express();

// Các middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/owner", ownerRouter);

// Tuyến cơ bản
app.get("/", (_req, res) => {
  res.send("Máy chủ đang chạy!");
});

const PORT = process.env.PORT || 3000;

// Hàm khởi động server và kết nối database
const startServer = async () => {
  try {
    // Kết nối đến database trước khi khởi động server
    await connectDB();

    // Khởi động server sau khi kết nối database thành công
    app.listen(PORT, () => {
      console.log(`Máy chủ đang chạy trên cổng ${PORT}`);
    });
  } catch (error) {
    console.error(`Lỗi khởi động server: ${error.message}`);
    process.exit(1);
  }
};

// Khởi động server
startServer();
