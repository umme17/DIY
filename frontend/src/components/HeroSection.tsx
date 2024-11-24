import { useNavigate } from "react-router-dom";
import AnimatedContent from "./AnimatedContent";

const HeroSection = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between text-gray-900 px-10 py-32 h-auto bg-cover bg-center">
      {/* Left Side: Animated Content */}
      <div className="flex-1 p-8 relative z-10">
        <div className="text-center">
          <AnimatedContent />
        </div>
      </div>

      {/* Right Side: Get Started Panel */}
      <div className="flex-1 flex justify-center items-center">
        <div className="bg-white p-8 rounded-xl shadow-xl text-center border border-gray-300 max-w-md">
          <h3 className="text-2xl font-semibold text-purple-600 mb-4">
            Get Started Today
          </h3>
          <p className="text-gray-800 text-lg mb-6">
            Join thousands of users on their success journey. It’s simple and
            effective!
          </p>
          <button
            onClick={() => navigate("/login")} // Navigate to the login page
            className="bg-purple-500 text-white px-8 py-4 rounded-full shadow-md hover:bg-purple-600 transition-all duration-300"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
