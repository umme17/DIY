import { useState, useEffect } from "react";

const AnimatedContent = () => {
  const [content, setContent] = useState(0);

  // Simulating animated content by cycling through messages
  const messages = [
    "Collaborate seamlessly with your team.",
    "Track progress and manage projects efficiently.",
    "Join forums to share and learn with the community.",
    "Schedule consultations with ease.",
  ];

  // Automatically cycle through the messages
  useEffect(() => {
    const interval = setInterval(() => {
      setContent((prevContent) => (prevContent + 1) % messages.length);
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [messages.length]);

  return (
    <div className="text-center">
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
        Empower Your <span className="text-purple-500">DIY Projects</span>
      </h1>
      {/* <p className="text-gray-500  mb-6 text-3xl">
            Discover a world of endless possibilities with our solutions.
       </p> */}

      {/* Animated Message */}
      <p className="text-lg md:text-xl text-gray-700 transition-all duration-500">
        {messages[content]}
      </p>

      {/* Indicator Dots */}
      <div className="flex justify-center mt-8 space-x-4">
        {messages.map((_, idx) => (
          <div
            key={idx}
            className={`h-4 w-4 rounded-full cursor-pointer transition-all duration-300 ${
              idx === content ? "bg-purple-500 scale-110" : "bg-gray-400"
            }`}
            onClick={() => setContent(idx)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedContent;
