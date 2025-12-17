


import { useState } from "react";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://shopease-backend-csp7.onrender.com/auth/login", { email, password });
      const { token, role } = res.data;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("isLoggedIn", "true");

      toast.success("Login successful!", { autoClose: 250 });
      navigate("/home");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Login failed", { autoClose: 250 });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200"
      >
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          Welcome Back
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-3 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-300 transition"
        />

        <button
          type="submit"
          className="w-full bg-blue-200 text-blue-800 py-3 rounded-lg font-semibold hover:bg-blue-300 transition"
        >
          Login
        </button>

        <p className="text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-800 font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
