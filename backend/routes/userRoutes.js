import express from "express";
import {
  getUserData,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import { protect } from "../middleware/auth.js";

// Router cho các route liên quan đến người dùng
const userRouter = express.Router();

// Route đăng ký người dùng mới (không cần xác thực)
userRouter.post("/register", registerUser);

// Route đăng nhập người dùng (không cần xác thực)
userRouter.post("/login", loginUser);

// Route lấy thông tin người dùng hiện tại (yêu cầu xác thực qua middleware protect)
userRouter.get("/data", protect, getUserData);

export default userRouter;
