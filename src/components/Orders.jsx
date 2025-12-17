


import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // ---------------- FETCH ORDERS ----------------
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("https://shopease-backend-csp7.onrender.com/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Fetch orders failed:", error.response?.data);
        toast.error("Failed to load orders", { autoClose: 250 });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  // ---------------- LOADING STATE ----------------
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-20 text-center text-lg font-medium text-gray-600">
        Loading orders...
      </div>
    );
  }

  // ---------------- EMPTY STATE ----------------
  if (!orders.length) {
    return (
      <div className="max-w-4xl mx-auto p-10 mt-20 text-center bg-gray-50 rounded-2xl shadow-md">
        <p className="text-xl font-semibold text-gray-800">
          You haven’t placed any orders yet
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-blue-200 text-blue-800 px-6 py-2 rounded-xl hover:bg-blue-300 transition font-medium"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  // ---------------- ORDERS LIST ----------------
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Your Orders
      </h1>

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
          >
            {/* Order Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  Order #{order._id.slice(-6)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span className={`px-4 py-1 rounded-full text-sm font-medium ${
                order.deliveryStatus === "Delivered" ? "bg-green-100 text-green-800" :
                order.deliveryStatus === "Pending" ? "bg-yellow-100 text-yellow-800" :
                "bg-indigo-100 text-indigo-800"
              } w-fit`}>
                {order.deliveryStatus}
              </span>
            </div>

            {/* Products */}
            <div className="mt-6 space-y-4">
              {order.products.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row gap-4 items-center border rounded-xl p-4 bg-gray-50 hover:bg-gray-100 transition"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-sm"
                  />

                  <div className="flex-1 w-full">
                    <p className="font-semibold text-gray-800 text-lg">
                      {item.product.name}
                    </p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="font-bold text-gray-900">
                      ₹{item.product.price * item.quantity}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/products/${item.product.id}`)
                    }
                    className="bg-blue-200 text-blue-800 px-4 py-2 rounded-xl hover:bg-blue-300 transition font-medium"
                  >
                    View Product
                  </button>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex justify-between items-center mt-6 border-t pt-4 text-lg font-semibold text-gray-800">
              <span>Total Amount</span>
              <span className="text-gray-900 font-bold">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
