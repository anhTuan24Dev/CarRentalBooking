import { useState } from "react";

/**
 * Component Login - Modal đăng nhập và đăng ký
 * Hiển thị form đăng nhập/đăng ký với khả năng chuyển đổi giữa hai chế độ
 * @param {Object} props - Props của component
 * @param {Function} props.setShowLogin - Hàm để đóng modal đăng nhập
 * @returns {JSX.Element} Modal với form đăng nhập/đăng ký
 */
const Login = ({ setShowLogin }) => {
  // State quản lý chế độ hiện tại (login hoặc register)
  const [state, setState] = useState("login");
  // State quản lý tên người dùng (chỉ dùng khi đăng ký)
  const [name, setName] = useState("");
  // State quản lý email
  const [email, setEmail] = useState("");
  // State quản lý mật khẩu
  const [password, setPassword] = useState("");

  /**
   * Xử lý submit form
   * @param {Event} e - Event object từ form submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý logic đăng nhập/đăng ký ở đây
    console.log({ email, name, password, state });
  };

  /**
   * Xử lý đóng modal khi click hoặc nhấn phím Escape
   * @param {Event} e - Event object
   */
  const handleClose = (e) => {
    if (e.type === "keydown" && e.key !== "Escape") {
      return;
    }
    setShowLogin(false);
  };

  return (
    <div
      aria-label="Đăng nhập hoặc Đăng ký"
      aria-modal="true"
      className="top-0 right-0 bottom-0 left-0 z-100 fixed flex justify-center items-center bg-black/50 p-4 text-gray-600 text-sm"
      onClick={handleClose}
      onKeyDown={handleClose}
      role="dialog"
      tabIndex={-1}
    >
      <form
        className="flex flex-col items-start gap-4 bg-white shadow-xl p-8 py-12 border border-gray-200 rounded-lg w-full max-w-[352px] text-gray-500"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        {/* Tiêu đề form */}
        <p className="m-auto font-medium text-2xl">
          <span className="text-indigo-500">
            {state === "login" ? "Đăng nhập" : "Đăng ký"}
          </span>
        </p>

        {/* Trường nhập tên (chỉ hiển thị khi đăng ký) */}
        {state === "register" && (
          <div className="w-full">
            <p>Tên</p>
            <input
              className="mt-1 p-2 border border-gray-200 rounded outline-indigo-500 w-full"
              onChange={(e) => setName(e.target.value)}
              placeholder="nhập vào đây"
              required
              type="text"
              value={name}
            />
          </div>
        )}

        {/* Trường nhập email */}
        <div className="w-full">
          <p>Email</p>
          <input
            className="mt-1 p-2 border border-gray-200 rounded outline-indigo-500 w-full"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nhập vào đây"
            required
            type="email"
            value={email}
          />
        </div>

        {/* Trường nhập mật khẩu */}
        <div className="w-full">
          <p>Mật khẩu</p>
          <input
            className="mt-1 p-2 border border-gray-200 rounded outline-indigo-500 w-full"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="nhập vào đây"
            required
            type="password"
            value={password}
          />
        </div>

        {/* Link chuyển đổi giữa đăng nhập và đăng ký */}
        {state === "register" ? (
          <p>
            Đã có tài khoản?{" "}
            <button
              className="bg-transparent p-0 border-0 text-indigo-500 hover:underline cursor-pointer"
              onClick={() => setState("login")}
              type="button"
            >
              bấm vào đây
            </button>
          </p>
        ) : (
          <p>
            Tạo tài khoản?{" "}
            <button
              className="bg-transparent p-0 border-0 text-indigo-500 hover:underline cursor-pointer"
              onClick={() => setState("register")}
              type="button"
            >
              bấm vào đây
            </button>
          </p>
        )}

        {/* Nút submit */}
        <button
          className="bg-indigo-500 hover:bg-indigo-600 py-2 rounded-md w-full text-white transition-all cursor-pointer"
          type="submit"
        >
          {state === "register" ? "Tạo tài khoản" : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
};

export default Login;
