import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"; // Icons for navigation

// Define a type for slide data
interface Slide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  background: string;
}

const SlidingThumbnails: React.FC = () => {
  // Example slide data
  const slides: Slide[] = [
    {
      id: 1,
      title: "Black Friday - Shop the best deals!",
      description: "Shop now and save big on your favorite components.",
      buttonText: "Shop Now",
      background: "bg-black text-white",
    },
    {
      id: 2,
      title: "The next step in your Arduino journey",
      description:
        "Visualize and interact with your sensor data in real-time.",
      buttonText: "Discover Now",
      background: "bg-teal-500 text-white",
    },
    {
      id: 3,
      title: "Explore New Robotics Projects",
      description: "Learn and build exciting robotics projects with ease.",
      buttonText: "Explore",
      background: "bg-blue-600 text-white",
    },
  ];

  // State to track the current slide
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Handlers for navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden mt-6">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`flex-shrink-0 w-full h-60 p-6 flex items-center justify-between ${slide.background} rounded-lg`}
          >
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
              <p className="text-sm mb-4">{slide.description}</p>
              <button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-100">
                {slide.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md hover:bg-gray-300"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-gray-800" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SlidingThumbnails;
