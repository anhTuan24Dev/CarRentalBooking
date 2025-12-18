import { useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageCars = () => {
  // State cho danh sách xe của chủ xe
  const [cars, setCars] = useState([]);

  // Khi component mount thì fetch dữ liệu xe
  useEffect(() => {
    // Hàm lấy danh sách xe của chủ xe (có thể thay bằng gọi API thực tế)
    const fetchOwnerCars = async () => {
      // TODO: Gọi API để lấy danh sách xe
      // const response = await fetch('/api/owner/cars');
      // const data = await response.json();
      // setCars(data);

      // Tạm thời dùng dữ liệu dummy
      setCars(dummyCarData);
    };

    fetchOwnerCars();
  }, []);

  // Xử lý xóa xe
  const handleDelete = (carId) => {
    // TODO: Gọi API xóa xe với carId
    console.log("Delete car:", carId);
    // Sau khi xóa thành công thì cập nhật state
    setCars(cars.filter((car) => car._id !== carId));
  };

  // Xử lý chỉnh sửa hoặc mở modal trạng thái
  const handleEdit = (carId) => {
    // TODO: Chuyển hướng đến trang chỉnh sửa hoặc mở modal
    console.log("Edit car:", carId);
  };

  return (
    <div className="px-4 md:px-10 pt-10 w-full">
      <Title
        description="Xem tất cả xe đã đăng ký, cập nhật thông tin, hoặc xóa xe khỏi nền tảng đặt xe."
        title="Quản lý xe"
      />

      {/* Bảng danh sách xe */}
      <div className="mt-6 border border-borderColor rounded-md w-full max-w-3xl overflow-hidden">
        <table className="w-full text-gray-600 text-sm text-left border-collapse">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Xe</th>
              <th className="max-md:hidden p-3 font-medium">Loại xe</th>
              <th className="p-3 font-medium">Giá</th>
              <th className="max-md:hidden p-3 font-medium">Trạng thái</th>
              <th className="p-3 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {cars.length === 0 ? (
              <tr>
                <td className="p-6 text-gray-500 text-center" colSpan="5">
                  {/* Chưa có xe nào */}
                  Chưa có xe nào được đăng ký
                </td>
              </tr>
            ) : (
              cars.map((car) => (
                <tr
                  className="hover:bg-gray-50 border-borderColor border-t"
                  key={car._id}
                >
                  {/* Cột xe: ảnh + tên xe */}
                  <td className="flex items-center gap-3 p-3">
                    <img
                      alt={`${car.brand} ${car.model}`}
                      className="rounded-md w-12 h-12 object-cover"
                      src={car.image}
                    />
                    <div className="max-md:hidden">
                      <p className="font-medium">
                        {car.brand} {car.model}
                      </p>
                      {/* số ghế và hộp số */}
                      <p className="text-gray-500 text-xs">
                        {car.seating_capacity} - {car.transmission}
                      </p>
                    </div>
                  </td>

                  {/* Cột loại xe (ẩn trên mobile) */}
                  <td className="max-md:hidden p-3">
                    <span className="text-gray-600">{car.category}</span>
                  </td>

                  {/* Cột giá */}
                  <td className="p-3">
                    {car.pricePerDay.toLocaleString("vi-VN")}₫/ngày
                  </td>

                  {/* Cột trạng thái (ẩn trên mobile) */}
                  <td className="max-md:hidden p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        car.isAvaliable
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      {car.isAvaliable ? "Có sẵn" : "Không có sẵn"}
                    </span>
                  </td>

                  {/* Cột thao tác */}
                  <td className="flex items-center p-3">
                    <button
                      aria-label="Toggle availability"
                      className="bg-transparent p-0 border-none cursor-pointer"
                      onClick={() => handleEdit(car._id)}
                      type="button"
                    >
                      <img
                        alt="Toggle availability"
                        src={
                          car.isAvaliable
                            ? assets.eye_close_icon
                            : assets.eye_icon
                        }
                      />
                    </button>
                    <button
                      aria-label="Delete car"
                      className="bg-transparent p-0 border-none cursor-pointer"
                      onClick={() => handleDelete(car._id)}
                      type="button"
                    >
                      <img alt="Delete car" src={assets.delete_icon} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCars;
