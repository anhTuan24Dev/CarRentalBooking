import { useState } from "react";
import { assets, cityList } from "../../assets/assets";
import Title from "../../components/owner/Title";

// Component Thêm Xe Mới
const AddCar = () => {
  // State lưu file ảnh upload và preview để hiển thị
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // State lưu thông tin xe
  const [car, setCar] = useState({
    brand: "", // Hãng xe
    category: "", // Loại xe
    description: "", // Mô tả xe
    fuel_type: "", // Loại nhiên liệu
    location: "", // Địa điểm cho thuê
    model: "", // Mẫu xe
    pricePerDay: 0, // Giá thuê/ngày
    seating_capacity: 0, // Số chỗ ngồi
    transmission: "", // Hộp số
    year: 0, // Năm sản xuất
  });

  // Hàm xử lý khi người dùng thay đổi input form (cập nhật state car)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({
      ...prev,
      // Nếu là trường số thì convert sang Number, còn lại giữ nguyên value string
      [name]:
        name === "pricePerDay" || name === "seating_capacity" || name === "year"
          ? Number(value)
          : value,
    }));
  };

  // Hàm xử lý khi upload/chọn ảnh
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      // Tạo preview ảnh (base64) để show lên UI
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Hàm xử lý submit form thêm xe mới
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gửi dữ liệu car và image lên API backend để thêm xe
    console.log("Car data:", car); // Xem thông tin xe trên console
    console.log("Image:", image); // Xem file ảnh trên console
  };

  return (
    <div className="flex-1 px-4 md:px-10 py-10">
      {/* Tiêu đề trang và mô tả */}
      <Title
        description="Điền thông tin chi tiết để đăng ký xe mới cho thuê, bao gồm giá cả, tình trạng và thông số kỹ thuật của xe."
        title="Thêm xe mới"
      />

      {/* Form nhập thông tin xe */}
      <form
        className="flex flex-col gap-5 mt-6 max-w-xl text-gray-500 text-sm"
        onSubmit={handleSubmit}
      >
        {/* Thành phần upload ảnh */}
        <div className="flex items-center gap-2 w-full">
          <label className="cursor-pointer" htmlFor="car-image">
            <img
              alt="Upload icon"
              className="rounded h-14 cursor-pointer"
              src={imagePreview || assets.upload_icon}
            />
            <input
              accept="image/*"
              hidden
              id="car-image"
              onChange={handleImageChange}
              type="file"
            />
          </label>
          <p className="text-gray-500 text-sm">Tải lên hình ảnh xe của bạn</p>
        </div>

        {/* Nhập hãng xe và mẫu xe */}
        <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
          <div className="flex flex-col w-full">
            <label htmlFor="brand">Hãng xe</label>
            <input
              className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
              id="brand"
              name="brand"
              onChange={handleChange}
              placeholder="Ví dụ: BMW, Mercedes, Audi..."
              required
              type="text"
              value={car.brand}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="model">Mẫu xe</label>
            <input
              className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
              id="model"
              name="model"
              onChange={handleChange}
              placeholder="Ví dụ: X5, E-Class, M4..."
              required
              type="text"
              value={car.model}
            />
          </div>
        </div>

        {/* Nhập năm sản xuất, giá thuê/ngày, loại xe */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col w-full">
            <label htmlFor="year">Năm sản xuất</label>
            <input
              className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
              id="year"
              name="year"
              onChange={handleChange}
              placeholder="2025"
              required
              type="number"
              value={car.year || ""}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="pricePerDay">Giá thuê/ngày (VNĐ)</label>
            <input
              className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
              id="pricePerDay"
              name="pricePerDay"
              onChange={handleChange}
              placeholder="1000000"
              required
              type="number"
              value={car.pricePerDay || ""}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="category">Loại xe</label>
            <select
              className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
              id="category"
              name="category"
              onChange={handleChange}
              value={car.category}
            >
              <option value="">Chọn loại xe</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Nhập hộp số, loại nhiên liệu, số chỗ ngồi */}
        <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col w-full">
            <label htmlFor="transmission">Hộp số</label>
            <select
              className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
              id="transmission"
              name="transmission"
              onChange={handleChange}
              value={car.transmission}
            >
              <option value="">Chọn loại hộp số</option>
              <option value="Tự động">Tự động</option>
              <option value="Số sàn">Số sàn</option>
              <option value="Bán tự động">Bán tự động</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="fuel_type">Loại nhiên liệu</label>
            <select
              className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
              id="fuel_type"
              name="fuel_type"
              onChange={handleChange}
              value={car.fuel_type}
            >
              <option value="">Chọn loại nhiên liệu</option>
              <option value="Xăng">Xăng</option>
              <option value="Diesel">Diesel</option>
              <option value="Điện">Điện</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="seating_capacity">Số chỗ ngồi</label>
            <input
              className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
              id="seating_capacity"
              name="seating_capacity"
              onChange={handleChange}
              placeholder="4"
              required
              type="number"
              value={car.seating_capacity || ""}
            />
          </div>
        </div>

        {/* Chọn địa điểm cho thuê xe */}
        <div className="flex flex-col w-full">
          <label htmlFor="location">Địa điểm</label>
          <select
            className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
            id="location"
            name="location"
            onChange={handleChange}
            value={car.location}
          >
            <option value="">Chọn địa điểm</option>
            {/* Danh sách thành phố lấy từ biến cityList */}
            {cityList.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Nhập mô tả xe */}
        <div className="flex flex-col w-full">
          <label htmlFor="description">Mô tả</label>
          <textarea
            className="mt-1 px-3 py-2 border border-borderColor rounded-md outline-none"
            id="description"
            name="description"
            onChange={handleChange}
            placeholder="Ví dụ: Một chiếc SUV sang trọng với nội thất rộng rãi và động cơ mạnh mẽ."
            required
            rows="5"
            value={car.description}
          />
        </div>

        {/* Nút đăng ký xe mới */}
        <button
          className="flex items-center gap-2 bg-primary mt-4 px-4 py-2.5 rounded-md w-max font-medium text-white cursor-pointer"
          type="submit"
        >
          <img alt="Tick icon" src={assets.tick_icon} />
          Đăng ký xe
        </button>
      </form>
    </div>
  );
};

export default AddCar;
