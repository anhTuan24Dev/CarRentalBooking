import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

// Schema cho thông tin xe cho thuê
const carSchema = new mongoose.Schema(
  {
    // Hãng xe (ví dụ: Toyota, Honda, Ford...)
    brand: { required: true, type: String },
    // Loại xe (ví dụ: Sedan, SUV, Hatchback...)
    category: { required: true, type: String },
    // Mô tả chi tiết về xe
    description: { required: true, type: String },
    // Loại nhiên liệu (ví dụ: Xăng, Dầu, Điện, Hybrid...)
    fuel_type: { required: true, type: String },
    // URL ảnh của xe
    image: { required: true, type: String },
    // Trạng thái sẵn có của xe (true: có sẵn, false: đã được thuê)
    isAvailable: { default: true, type: Boolean },
    // Vị trí/địa điểm của xe (nơi có thể nhận xe)
    location: { required: true, type: String },
    // Mẫu xe (ví dụ: Camry, CR-V, Focus...)
    model: { required: true, type: String },
    // Tham chiếu đến chủ sở hữu xe (User có role là "owner")
    owner: {
      ref: "User",
      required: true,
      type: ObjectId,
    },
    // Giá thuê mỗi ngày (đơn vị: VNĐ hoặc tiền tệ khác)
    pricePerDay: { required: true, type: Number },
    // Số chỗ ngồi của xe
    seating_capacity: { required: true, type: Number },
    // Loại hộp số (ví dụ: Số sàn, Số tự động...)
    transmission: { required: true, type: String },
    // Năm sản xuất của xe
    year: { required: true, type: Number },
  },
  { timestamps: true }, // Tự động thêm created_at và updated_at
);

const Car = mongoose.model("Car", carSchema);
export default Car;
