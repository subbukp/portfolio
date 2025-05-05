import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Contact from '@/components/sections/Contact';
import Resume from '@/components/sections/Resume';
import Layout from '@/components/shared/Layout';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Resume />
      <Projects />
      <Contact />
    </Layout>
  );
} 