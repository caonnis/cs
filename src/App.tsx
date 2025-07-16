import { useState } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { Team } from '@/components/Team';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { News } from '@/components/News';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'news'>('home');

  // Prevent redirect to home on refresh when in news
  useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('news') || window.location.hash === '#news') {
        setCurrentPage('news');
      }
    }
  });
  if (currentPage === 'news') {
    return <News onNavigateToHome={() => setCurrentPage('home')} />;
  }

  return (
    <div className="min-h-screen">
      <Header onNavigateToNews={() => setCurrentPage('news')} />
      <main>
        <Hero />
        <Services />
        <Team />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;