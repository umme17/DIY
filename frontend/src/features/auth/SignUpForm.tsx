import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/background.png";
import logo from "../../assets/logo.png";
import { useAuth } from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { signup } = useAuth();

  const refreshData = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    try {

      const response = await signup(userData);
        
      if(response){
        refreshData();
        toast.success("Registration successful! Please log in.");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="h-screen w-screen grid grid-cols-2">
      {/* Left Side */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-full max-w-lg p-10">
          
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/">
              <img src={logo} alt="Logo" className="h-20 w-auto cursor-pointer" />
            </Link>
            <div>
              <h2 className="text-3xl font-bold text-gray-700">
                Create your account
              </h2>
              <p className="text-gray-500 text-sm">
                Welcome! Please fill in the details to get started.
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Name Row */}
            <div className="flex gap-6">
              <div className="flex flex-col w-1/2">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-600">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="flex flex-col w-1/2">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-600">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-medium text-gray-600">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <span className="absolute right-3 top-3 text-gray-500 cursor-pointer">
                  👁️
                </span>
              </div>
            </div>

            {/* Submit */}
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

      {/* Right Side */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="absolute inset-0 bg-white opacity-60"></div>
      </div>
    </div>
  );
};

export default SignUpForm;