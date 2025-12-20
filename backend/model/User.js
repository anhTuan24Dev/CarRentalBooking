import mongoose from "mongoose";

// Schema cho thông tin người dùng trong hệ thống
const userSchema = new mongoose.Schema(
  {
    // Email đăng nhập (phải là duy nhất trong hệ thống)
    email: { required: true, type: String, unique: true },
    // URL ảnh đại diện của người dùng (mặc định là chuỗi rỗng)
    image: { default: "", type: String },
    // Tên hiển thị của người dùng
    name: { required: true, type: String },
    // Mật khẩu đã được mã hóa bằng bcrypt
    password: { required: true, type: String },
    // Vai trò của người dùng: "user" (người thuê xe) hoặc "owner" (chủ xe)
    role: {
      default: "user", // Mặc định là người dùng thông thường
      enum: ["user", "owner"], // Chỉ cho phép 2 giá trị này
      required: true,
      type: String,
    },
  },
  { timestamps: true }, // Tự động thêm created_at và updated_at
);

const User = mongoose.model("User", userSchema);
export default User;
