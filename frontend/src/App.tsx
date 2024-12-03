import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import ForumPage from './pages/ForumPage';
import ThreadDetails from './components/discussion/ThreadDetails';
import CreateProject from './pages/CreateProject';
import ProjectDisplayPage from './pages/ShowProject';
import Consultation from './pages/ConsultationPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forum" element={<ForumPage />} />
      <Route path="/consultation" element={<Consultation />} />
      <Route path="/createProject" element={<CreateProject />} />
      <Route path="/displayproject/:id" element={<ProjectDisplayPage />} />
      <Route path="/thread/:id" element={<ThreadDetails />} />
    </Routes>
  );
};

export default App;
