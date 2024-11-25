import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
// import ForumList from "./components/Forum/ForumList";

import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard'
import ForumPage from './pages/ForumPage';
import ThreadDetails from './components/discussion/ThreadDetails';
import CreateProject from './pages/CreateProject';
import ShowProject from './pages/ShowProject';
import Consultation from './pages/ConsultationPage';
// import DiscussionPage from './pages/DiscussionPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/createProject" element={<CreateProject />} />

        {/* <Route path="/showProject" element={<ShowProject/>} /> */}
        <Route path="/displayproject/:id" element={<ShowProject />} />


        {/* Forum List Page */}
        {/* <Route path="/forumlist" element={<ForumList />} /> */}
        
        {/* Forum Details Page */}
        <Route path="/thread/:id" element={<ThreadDetails />} />
      </Routes>
    </Router>
  );
  
};

export default App;
