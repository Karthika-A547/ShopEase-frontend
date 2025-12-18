
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const Cart = ({ CartProduct, setCartProduct }) => {
  const [quantities, setQuantities] = useState([]);
  const [backendTotal, setBackendTotal] = useState(0);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  const [paymentMethod] = useState("COD");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  // ---------------- FETCH CART ----------------
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      try {
        const res = await axios.get("https://shopease-backend-csp7.onrender.com/carts", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const carts = res.data.cart
          ? res.data.cart.products.map((item) => ({
              id: item.product._id,
              name: item.product.name,
              price: item.product.price,
              image: item.product.image,
              description: item.product.description,
              quantity: item.quantity,
            }))
          : [];

        setCartProduct(carts);
        setQuantities(carts.map((i) => i.quantity));
        setBackendTotal(
          carts.reduce((s, i) => s + i.price * i.quantity, 0)
        );
      } catch {
        toast.error("Failed to load cart", { autoClose: 300 });
      }
    };
    fetchCart();
  }, [token, setCartProduct]);

  // ---------------- UPDATE QTY ----------------
  const updateQuantity = async (index, qty) => {
    if (qty < 1) return;
    const product = CartProduct[index];

    await axios.put(
      "https://shopease-backend-csp7.onrender.com/carts",
      { productId: product.id, quantity: qty },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updated = CartProduct.map((p, i) =>
      i === index ? { ...p, quantity: qty } : p
    );

    setCartProduct(updated);
    setQuantities(updated.map((i) => i.quantity));
    setBackendTotal(updated.reduce((s, i) => s + i.price * i.quantity, 0));
  };

  // ---------------- REMOVE ----------------
  const handleRemove = async (id, index) => {
    await axios.delete(`https://shopease-backend-csp7.onrender.com/carts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updated = CartProduct.filter((_, i) => i !== index);
    setCartProduct(updated);
    setQuantities(updated.map((i) => i.quantity));
    setBackendTotal(updated.reduce((s, i) => s + i.price * i.quantity, 0));
  };

  // ---------------- CHECKOUT ----------------
  const handleCheckout = async () => {
    try {
      const requiredFields = [
        "fullName",
        "phone",
        "addressLine",
        "city",
        "state",
        "pincode",
      ];

      for (let field of requiredFields) {
        if (!shippingAddress[field]) {
          toast.error(`Please fill ${field}`, { autoClose: 250 });
          return;
        }
      }

      await axios.post(
        "https://shopease-backend-csp7.onrender.com/orders",
        { shippingAddress, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartProduct([]);
      setQuantities([]);
      setBackendTotal(0);

      toast.success("Order placed successfully", { autoClose: 250 });
      navigate("/order");
    } catch (error) {
      console.error("Checkout failed:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Checkout failed. Try again",
        { autoClose: 250 }
      );
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* CART ITEMS */}
        <div className="flex-1 bg-gray-50 p-6 rounded-2xl shadow-md">
          {CartProduct.length === 0 && (
            <p className="text-center font-medium text-gray-600">
              Your cart is empty
            </p>
          )}

          {CartProduct.map((p, i) => (
            <div
              key={p.id}
              className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl shadow mb-4 transition hover:shadow-lg"
            >
              <img
                src={p.image}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1 w-full">
                <h2 className="font-semibold text-gray-800">{p.name}</h2>
                <p className="text-gray-500">{p.description}</p>
                <p className="font-bold mt-1 text-gray-900">
                  ₹{p.price * quantities[i]}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(i, quantities[i] - 1)}
                  className="h-8 w-8 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                >
                  -
                </button>
                <span className="font-medium">{quantities[i]}</span>
                <button
                  onClick={() => updateQuantity(i, quantities[i] + 1)}
                  className="h-8 w-8 border border-gray-300 rounded-full hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => handleRemove(p.id, i)}
                className="bg-red-200 text-red-800 px-3 py-1 rounded-lg hover:bg-red-300 transition font-medium"
              >
                Remove
              </button>
            </div>
          ))}

          {/* ADDRESS FORM */}
          {CartProduct.length > 0 && (
            <div className="mt-6 space-y-3">
              {Object.keys(shippingAddress).map(
                (key) =>
                  key !== "country" && (
                    <input
                      key={key}
                      placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={shippingAddress[key]}
                      onChange={(e) =>
                        setShippingAddress({
                          ...shippingAddress,
                          [key]: e.target.value,
                        })
                      }
                      className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    />
                  )
              )}
            </div>
          )}
        </div>

        {/* ORDER SUMMARY */}
        <div className="w-full lg:w-1/3 bg-gray-50 p-6 rounded-2xl shadow-md h-fit">
          <h2 className="text-xl font-semibold text-center mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="flex justify-between font-medium text-gray-700 mb-4">
            <span>Total:</span>
            <span className="font-bold text-gray-900">₹{backendTotal}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-blue-200 text-blue-800 py-2 rounded-lg font-semibold hover:bg-blue-300 transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;






