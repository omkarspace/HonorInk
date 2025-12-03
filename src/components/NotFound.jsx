import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-8">
    <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-yellow-400 mb-4">
      404
    </h1>
    <p className="text-2xl text-gray-300 mb-8">Page Not Found</p>
    <Link
      to="/"
      className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 transition-colors duration-200"
    >
      Go Home
    </Link>
  </div>
);

export default NotFound;
