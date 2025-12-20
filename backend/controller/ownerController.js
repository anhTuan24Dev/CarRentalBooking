import User from "../model/User.js";

// Controller xử lý việc thay đổi vai trò người dùng thành owner (chủ xe)
// Yêu cầu người dùng phải đã đăng nhập (middleware protect)
export const changeRoleToOwner = async (req, res) => {
  try {
    // Lấy ID người dùng từ thông tin đã được xác thực trong middleware protect
    const { _id } = req.user;

    // Cập nhật vai trò của người dùng thành "owner" trong database
    await User.findByIdAndUpdate(_id, { role: "owner" });

    res.json({
      message: "Đã thay đổi vai trò thành chủ xe thành công",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Lỗi thay đổi vai trò",
      success: false,
    });
  }
};
