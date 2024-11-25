import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../assets/background.png";
import logo from "../assets/logo.png"; // Import your logo

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const credentials = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      },);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token); // Store token for authenticated access
        navigate("/dashboard"); // Navigate to the dashboard after successful login
      } else {
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again later.");
    }
  };

  return (
    <div className="h-screen w-screen grid grid-cols-2">
      {/* Left Side: Login Form */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-lg p-10 items-center">
          {/* Logo and Welcome Content */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-20 w-auto cursor-pointer" />
            </Link>
            <div>
              <h2 className="text-3xl font-bold text-gray-700">Welcome Back!</h2>
              <p className="text-gray-500 text-sm">
                Please sign in to access your account.
              </p>
            </div>
          </div>

          {/* Sign-in Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                Username or Email
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

            <div className="text-right">
              <a href="#" className="text-purple-500 text-sm hover:underline focus:underline">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-medium px-6 py-3 rounded-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              SIGN IN
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            New here?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-purple-500 font-medium hover:underline cursor-pointer"
            >
              Create your account.
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
        <div className="absolute inset-0 bg-white opacity-60"></div>
      </div>
    </div>
  );
};

export default Login;
