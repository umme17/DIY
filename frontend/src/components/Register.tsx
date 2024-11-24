import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import logo from "../assets/logo.png"; // Import your logo

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the page from reloading

    // Prepare the user data
    const userData = {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
      age: 25, // You can add a field or make it dynamic
    };

    try {
      // Send the POST request to the backend
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      // Handle response
      if (response.ok) {
        // User successfully registered
        alert("User registered successfully!");
        navigate("/login"); // Redirect to login page
      } else {
        // Show error message
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="h-screen w-screen grid grid-cols-2">
      {/* Left Side: Register Form */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-lg p-10 items-center">
          {/* Logo and Welcome Content */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-20 w-auto cursor-pointer" />
            </Link>
            <div>
              <h2 className="text-3xl font-bold text-gray-700">Create your account</h2>
              <p className="text-gray-500 text-sm">
                Welcome! Please fill in the details to get started.
              </p>
            </div>
          </div>

          {/* Register Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex gap-6">
              {/* First Name */}
              <div className="w-1/2">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Last Name */}
              <div className="w-1/2">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Email address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-medium px-6 py-3 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Register
            </button>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => (window.location.href = "/login")}
              className="text-purple-500 font-medium hover:underline cursor-pointer"
            >
              Sign in
            </span>
          </p>
        </div>
      </div>

      {/* Right Side: Background with Full Overlay */}
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
        }}
      >
        {/* Full Overlay */}
        <div className="absolute inset-0 bg-white opacity-60"></div>
      </div>
    </div>
  );
};

export default Register;
