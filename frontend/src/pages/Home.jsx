import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import RecentPosts from '../components/RecentPosts.jsx';
import RecentProjects from '../components/RecentProjects.jsx';
import Skills from '../components/Skills.jsx';
import Contact from '../components/Contact.jsx';

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <RecentPosts />
      <RecentProjects />
      <Skills />
      <Contact />
    </div>
  );
}


