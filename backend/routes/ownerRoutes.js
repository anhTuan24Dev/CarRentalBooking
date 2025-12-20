import express from "express";
import { changeRoleToOwner } from "../controller/ownerController.js";
import { protect } from "../middleware/auth.js";

// Router cho các route liên quan đến chủ xe (owner)
const ownerRouter = express.Router();

// Route thay đổi vai trò người dùng thành chủ xe (yêu cầu xác thực qua middleware protect)
ownerRouter.post("/changeRole", protect, changeRoleToOwner);

export default ownerRouter;
