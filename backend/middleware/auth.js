import jwt from "jsonwebtoken";
import User from "../model/User.js";

// Middleware bảo vệ các route yêu cầu xác thực
// Giải mã và xác minh JWT token từ header Authorization
export const protect = async (req, res, next) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.headers.authorization;

    // Kiểm tra xem có token không
    if (!authHeader) {
      return res.status(401).json({
        message: "Không có token xác thực",
        success: false,
      });
    }

    // Xử lý định dạng Bearer token (Bearer <token>)
    let token;
    if (authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7); // Lấy phần token sau "Bearer "
    } else {
      token = authHeader; // Nếu không có prefix Bearer, lấy toàn bộ
    }

    // Xác minh và giải mã token bằng jwt.verify (an toàn hơn jwt.decode)
    // jwt.verify sẽ kiểm tra signature và expiration của token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kiểm tra xem có userId trong token không
    if (!decoded || !decoded.id) {
      return res.status(401).json({
        message: "Token không hợp lệ",
        success: false,
      });
    }

    // Tìm người dùng trong database và gán vào req.user (loại bỏ password)
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    // Gán thông tin người dùng vào request để các route tiếp theo có thể sử dụng
    req.user = user;
    next();
  } catch (error) {
    // Xử lý các lỗi xác thực
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Token không hợp lệ",
        success: false,
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token đã hết hạn",
        success: false,
      });
    }
    return res.status(500).json({
      message: error.message || "Lỗi xác thực",
      success: false,
    });
  }
};
