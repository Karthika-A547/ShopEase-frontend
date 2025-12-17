// import { useParams } from "react-router";

// const ProductDetails = ({ products, addToCart }) => {
//   const { id } = useParams();

//   if (!products || products.length === 0) {
//     return (
//       <div className="text-center mt-10 text-indigo-900 font-semibold">
//         Loading...
//       </div>
//     );
//   }

//   const product = products.find((p) => p.id === parseInt(id));

//   if (!product) {
//     return (
//       <div className="text-center mt-10 text-indigo-900 font-semibold">
//         Product not found!
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-[400px] mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
//       <img
//         src={product.image}
//         alt={product.name}
//         className="w-80 h-80 object-cover rounded-lg mb-4 mx-auto"
//       />
//       <h1 className="text-2xl font-bold mb-2 text-indigo-900">{product.name}</h1>
//       <p className="text-gray-700 mb-2">{product.description}</p>
//       <p className="text-indigo-900 font-bold mb-4">₹{product.price}</p>
      
//       <button
//         onClick={() => addToCart(product)}
//         className="bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-800 transition w-full"
//       >
//         Add to Cart
//       </button>
//     </div>
//   );
// };

// export default ProductDetails;




import { useParams } from "react-router";

const ProductDetails = ({ products, addToCart }) => {
  const { id } = useParams();

  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600 font-medium">
        Loading...
      </div>
    );
  }

  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="text-center mt-10 text-gray-600 font-medium">
        Product not found!
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover rounded-xl mb-4"
      />
      <h1 className="text-2xl font-semibold mb-2 text-gray-800">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <p className="text-gray-900 font-bold text-lg mb-4">₹{product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="w-full bg-blue-200 text-blue-800 py-3 rounded-lg font-medium hover:bg-blue-300 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
