import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav
      className="sticky top-0 bg-gradient-to-r from-white to-purple-100 text-gray-800 py-4 px-6 flex justify-between items-center w-full shadow-md z-50 border-b border-gray-200"
    >
      {/* Left: Logo and Title */}
      <div className="flex items-center gap-4">
        <img src={logo} alt="Logo" className="h-12" />
        <h1 className="text-lg font-semibold text-gray-700">Projects Hub</h1>
      </div>

      {/* Center: Menu Items */}
      <div className="flex items-center gap-8">
        <div className="relative group">
          <button className="text-gray-600 font-medium hover:text-gray-900">
            Products
          </button>
          {/* Dropdown */}
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md mt-2 p-2 w-48 border border-gray-200">
            <a href="#product1" className="block px-3 py-2 hover:bg-gray-100">
              Product 1
            </a>
            <a href="#product2" className="block px-3 py-2 hover:bg-gray-100">
              Product 2
            </a>
          </div>
        </div>
        <a href="#marketplace" className="text-gray-600 font-medium hover:text-gray-900">
          Marketplace
        </a>
        <a href="#pricing" className="text-gray-600 font-medium hover:text-gray-900">
          Pricing
        </a>
        <div className="relative group">
          <button className="text-gray-600 font-medium hover:text-gray-900">
            Resources
          </button>
          {/* Dropdown */}
          <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md mt-2 p-2 w-48 border border-gray-200">
            <a href="#resource1" className="block px-3 py-2 hover:bg-gray-100">
              Resource 1
            </a>
            <a href="#resource2" className="block px-3 py-2 hover:bg-gray-100">
              Resource 2
            </a>
          </div>
        </div>
      </div>

      {/* Right: Auth Buttons */}
            {/* Right: Auth Buttons */}
            <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/login")} // Navigate to Login page
          className="text-gray-600 border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate("/register")} // Navigate to Register page
          className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        >
          Create an Account
        </button>
      </div>

    </nav>
  );
};

export default Navbar;
