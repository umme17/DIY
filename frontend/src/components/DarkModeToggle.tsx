import { useState, useEffect } from 'react';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="p-2 bg-secondary text-primary rounded-full hover:bg-accent hover:text-secondary"
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default DarkModeToggle;
