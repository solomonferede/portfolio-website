import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Experience from '../components/Experience.jsx';
import Education from '../components/Education.jsx';
import Certificates from '../components/Certificates.jsx';
import RecentPosts from '../components/RecentPosts.jsx';
import RecentProjects from '../components/RecentProjects.jsx';
import Skills from '../components/Skills.jsx';
import Contact from '../components/Contact.jsx';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 0);
      }
    }
  }, [location.hash]);

  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Certificates />
      <RecentPosts />
      <RecentProjects />
      <Skills />
      <Contact />
    </div>
  );
}


