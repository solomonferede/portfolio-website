import Navbar from './components/Navbar.jsx';
import Projects from './components/Projects.jsx';
import Blogs from './components/Blogs.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import { Routes, Route } from 'react-router-dom';
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
