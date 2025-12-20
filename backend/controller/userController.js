import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/User.js";

// Hàm tạo JWT token từ ID người dùng
// Token này được sử dụng để duy trì trạng thái đăng nhập và xác thực các request tiếp theo
const generateToken = (userId) => {
  // Tạo token với payload là userId và secret key từ biến môi trường
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // Token có hiệu lực trong 30 ngày
  });
};

// Controller xử lý đăng ký người dùng mới
export const registerUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Kiểm tra các trường bắt buộc và độ dài mật khẩu tối thiểu
    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin và mật khẩu tối thiểu 8 ký tự",
        success: false,
      });
    }

    // Kiểm tra xem email đã tồn tại trong hệ thống chưa
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "Email đã được sử dụng",
        success: false,
      });
    }

    // Mã hóa mật khẩu bằng bcrypt với salt rounds = 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới trong database
    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    // Tạo JWT token và gửi về client để duy trì trạng thái đăng nhập
    const token = generateToken(user._id.toString());
    res.status(201).json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message || "Lỗi đăng ký người dùng",
      success: false,
    });
  }
};

// Controller xử lý đăng nhập người dùng
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    // So khớp mật khẩu đã nhập với mật khẩu đã mã hóa trong database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Thông tin đăng nhập không chính xác",
        success: false,
      });
    }

    // Tạo JWT token và gửi về client để duy trì trạng thái đăng nhập
    const token = generateToken(user._id.toString());
    res.json({ success: true, token });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message || "Lỗi đăng nhập",
      success: false,
    });
  }
};

// Controller lấy thông tin người dùng hiện tại (yêu cầu xác thực)
export const getUserData = async (req, res) => {
  try {
    // Lấy thông tin người dùng từ middleware protect (đã được gán vào req.user)
    const { user } = req;
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message || "Lỗi lấy thông tin người dùng",
      success: false,
    });
  }
};
