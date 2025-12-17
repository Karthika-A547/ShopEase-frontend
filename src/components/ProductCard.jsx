// import { Link } from "react-router";

// const ProductCard = ({ product, addToCart }) => {
//   return (
//     <div className="bg-white shadow-lg rounded-xl p-4 w-[300px] hover:scale-105 transform transition">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="h-70 w-70 object-cover rounded-lg mb-3"
//       />
//       <h2 className="font-bold text-indigo-900">{product.name}</h2>
//       <p className="text-gray-700">₹{product.price}</p>

//       <div className="flex justify-between mt-3 py-2">
//         <button
//           onClick={() => addToCart(product)}
//           className="bg-indigo-900 text-white px-3 py-1 rounded hover:bg-indigo-800 transition"
//         >
//           Add
//         </button>

//         <Link
//           to={`/products/${product.id}`}
//           className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
//         >
//           View
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;


import { Link } from "react-router";

const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="bg-gray-50 shadow-md rounded-2xl p-4 w-[300px] hover:shadow-lg hover:scale-105 transform transition-all">
      <img
        src={product.image}
        alt={product.name}
        className="h-64 w-full object-cover rounded-xl mb-4"
      />
      <h2 className="font-semibold text-gray-800 text-lg mb-1">{product.name}</h2>
      <p className="text-gray-600 font-medium">₹{product.price}</p>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => addToCart(product)}
          className="bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-300 transition"
        >
          Add to Cart
        </button>

        <Link
          to={`/products/${product.id}`}
          className="bg-gray-200 px-4 py-2 rounded-lg font-medium text-gray-700 hover:bg-gray-300 transition"
        >
          View
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
