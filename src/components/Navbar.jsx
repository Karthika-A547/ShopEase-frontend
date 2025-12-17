


import { Link, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex w-full h-20 bg-white shadow-md justify-between items-center px-8 sticky top-0 z-50">
      {/* Logo */}
      <div className="text-gray-800 text-2xl font-semibold tracking-wide">ShopEase</div>

      {/* Navigation Links */}
      <div className="flex gap-4 text-md text-gray-700">
        <Link
          to="/home"
          className="px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
        >
          Home
        </Link>
        <Link
          to="/product"
          className="px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
        >
          Products
        </Link>
        <Link
          to="/cart"
          className="px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
        >
          Cart
        </Link>
        <Link
          to="/order"
          className="px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
        >
          Order
        </Link>
        
        {role === "admin" && (
          <Link
            to="/admin"
            className="px-4 py-2 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition"
          >
            Admin
          </Link>
        )}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        {!token ? (
          <>
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg bg-blue-200 text-blue-800 font-medium hover:bg-blue-300 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg bg-red-200 text-red-700 font-medium hover:bg-red-300 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

