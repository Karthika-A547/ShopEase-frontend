// import { Link } from "react-router";

// const Home = ({ products }) => {
//   return (
//     <div>
//       <h1 className="text-4xl font-bold text-center font-serif text-blue-900">Welcome to DigiMartx</h1>

//       {/* Top Products */}
//       <div className="max-w-6xl mx-auto py-10">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-900">Top Products</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products && products.slice(0, 3).map((p) => (
//             <div key={p.id} className="bg-white shadow-lg rounded-xl p-4 text-center hover:scale-105 transform transition">
//               <img src={p.image} alt={p.name} className="h-80 w-80 overflow-hidden object-cover rounded-lg mb-4" />
//               <h3 className="text-lg font-semibold">{p.name}</h3>
//               <p className="text-gray-700 font-medium">₹{p.price}</p>
//               <Link to="/product" className="mt-4 inline-block bg-indigo-900 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition">View More</Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;



import { Link } from "react-router";

const Home = ({ products }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif mb-4">
          Welcome to ShopEase
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Your one-stop shop for premium products
        </p>
      </div>

      {/* Top Products */}
      <div className="max-w-6xl mx-auto py-10 px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-gray-800">
          Top Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products && products.slice(0, 3).map((p) => (
            <div
              key={p.id}
              className="bg-white shadow-md rounded-2xl p-6 text-center hover:shadow-lg hover:scale-105 transform transition-all"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-64 w-full object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{p.name}</h3>
              <p className="text-gray-600 font-medium mb-4">₹{p.price}</p>
              <Link
                to="/product"
                className="inline-block bg-blue-200 text-blue-800 px-4 py-2 rounded-lg font-medium hover:bg-blue-300 transition"
              >
                View More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
