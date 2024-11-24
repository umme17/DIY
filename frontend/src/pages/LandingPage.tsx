import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center text-primary dark:text-secondary"
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gray-50"></div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
