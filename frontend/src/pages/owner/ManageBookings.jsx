import { useEffect, useState } from "react";
import { dummyMyBookingsData } from "../../assets/assets";
import Title from "../../components/owner/Title";

const ManageBookings = () => {
  // State cho danh sách đặt xe của chủ xe
  const [bookings, setBookings] = useState([]);

  // Khi component mount thì fetch dữ liệu đặt xe
  useEffect(() => {
    // Hàm lấy danh sách đặt xe của chủ xe (có thể thay bằng gọi API thực tế)
    const fetchOwnerBookings = async () => {
      // TODO: Gọi API để lấy danh sách đặt xe
      // const response = await fetch('/api/owner/bookings');
      // const data = await response.json();
      // setBookings(data);

      // Tạm thời dùng dữ liệu dummy
      setBookings(dummyMyBookingsData);
    };

    fetchOwnerBookings();
  }, []);

  // Xử lý thay đổi trạng thái đặt xe
  const handleStatusChange = (bookingId, newStatus) => {
    // TODO: Gọi API để cập nhật trạng thái đặt xe
    // const response = await fetch(`/api/owner/bookings/${bookingId}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ status: newStatus })
    // });
    // const data = await response.json();

    // Cập nhật state sau khi thay đổi thành công
    setBookings(
      bookings.map((booking) =>
        booking._id === bookingId ? { ...booking, status: newStatus } : booking,
      ),
    );
  };

  // Hàm format ngày tháng theo định dạng DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Hàm kiểm tra trạng thái đặt xe có phải là "đang chờ" không
  const isPendingStatus = (status) => {
    return status === "đang chờ";
  };

  // Hàm kiểm tra trạng thái đặt xe có phải là "đã xác nhận" không
  const isConfirmedStatus = (status) => {
    return status === "đã xác nhận";
  };

  return (
    <div className="px-4 md:px-10 pt-10 w-full">
      <Title
        description="Theo dõi tất cả đặt xe của khách hàng, phê duyệt hoặc hủy yêu cầu, và quản lý trạng thái đặt xe"
        title="Quản lý đặt xe"
      />

      {/* Bảng danh sách đặt xe */}
      <div className="mt-6 border border-borderColor rounded-md w-full max-w-3xl overflow-hidden">
        <table className="w-full text-gray-600 text-sm text-left border-collapse">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Xe</th>
              <th className="max-md:hidden p-3 font-medium">
                Khoảng thời gian
              </th>
              <th className="p-3 font-medium">Tổng tiền</th>
              <th className="max-md:hidden p-3 font-medium">Thanh toán</th>
              <th className="p-3 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 ? (
              <tr>
                <td className="p-6 text-gray-500 text-center" colSpan="5">
                  {/* Chưa có đặt xe nào */}
                  Chưa có đặt xe nào
                </td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr
                  className="hover:bg-gray-50 border-borderColor border-t text-gray-500"
                  key={booking._id}
                >
                  {/* Cột xe: ảnh + tên xe */}
                  <td className="flex items-center gap-3 p-3">
                    <img
                      alt={`${booking.car.brand} ${booking.car.model}`}
                      className="rounded-md w-12 h-12 object-cover aspect-square"
                      src={booking.car.image}
                    />
                    <div className="max-md:hidden">
                      <p className="font-medium">
                        {booking.car.brand} {booking.car.model}
                      </p>
                    </div>
                  </td>

                  {/* Cột khoảng thời gian (ẩn trên mobile) */}
                  <td className="max-md:hidden p-3">
                    {formatDate(booking.pickupDate)} -{" "}
                    {formatDate(booking.returnDate)}
                  </td>

                  {/* Cột tổng tiền */}
                  <td className="p-3">
                    {booking.price.toLocaleString("vi-VN")}₫
                  </td>

                  {/* Cột thanh toán (ẩn trên mobile) */}
                  <td className="max-md:hidden p-3">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                      Trực tiếp
                    </span>
                  </td>

                  {/* Cột thao tác */}
                  <td className="p-3">
                    {isPendingStatus(booking.status) ? (
                      <select
                        aria-label="Thay đổi trạng thái đặt xe"
                        className="px-2 py-1.5 border border-borderColor rounded-md outline-none text-gray-500"
                        onChange={(e) =>
                          handleStatusChange(booking._id, e.target.value)
                        }
                        value={booking.status}
                      >
                        <option value="đang chờ">Đang chờ</option>
                        <option value="đã hủy">Đã hủy</option>
                        <option value="đã xác nhận">Đã xác nhận</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isConfirmedStatus(booking.status)
                            ? "bg-green-100 text-green-500"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    )}
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

export default ManageBookings;
