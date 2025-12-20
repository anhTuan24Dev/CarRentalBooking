import mongoose from "mongoose";

/**
 * Kết nối đến cơ sở dữ liệu MongoDB thông qua Mongoose
 * Sử dụng connection string từ biến môi trường MONGODB_URI
 */
const connectDB = async () => {
  try {
    // Lấy connection string từ biến môi trường
    const mongoURI = process.env.MONGODB_URI;

    // Kiểm tra xem connection string có tồn tại không
    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI không được định nghĩa trong biến môi trường",
      );
    }

    // Kết nối đến MongoDB với các tùy chọn
    const conn = await mongoose.connect(mongoURI, {
      // Tùy chọn kết nối (có thể thêm tùy chọn khác nếu cần)
    });

    // Log thông báo khi kết nối thành công
    console.log(`Database connected: ${conn.connection.host}`);
  } catch (error) {
    // Xử lý lỗi kết nối
    console.error(`Lỗi kết nối database: ${error.message}`);
    // Thoát process nếu không kết nối được database
    process.exit(1);
  }
};

export default connectDB;
