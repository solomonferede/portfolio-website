import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import Blogs from './components/Blogs.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
import BlogDetail from './pages/BlogDetail.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import { useTheme } from './hooks/useTheme.js';

function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme !== 'light';

  return (
    <div>
      <Navbar onToggleTheme={toggleTheme} isDark={isDark} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blogs/:id" element={<BlogDetail />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
