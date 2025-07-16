import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';

interface HeaderProps {
  onNavigateToNews?: () => void;
}

export const Header = ({ onNavigateToNews }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, currentLanguage } = useLanguage();
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force re-render when language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Re-render when currentLanguage changes
  useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [currentLanguage]);

  const navItems = [
    { key: 'nav.home', href: '#home' },
    { key: 'nav.services', href: '#services' },
    { key: 'nav.about', href: '#about' },
    { key: 'nav.news', href: 'news' },
    { key: 'nav.contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    if (href === 'news') {
      onNavigateToNews?.();
      setIsMenuOpen(false);
      return;
    }
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0"
          >
            <button
              onClick={() => scrollToSection('#home')}
              className="text-2xl lg:text-3xl font-bold text-white hover:text-[#c85dad] transition-colors"
            >
              Certainty<span className="text-[#c85dad]">.</span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                onClick={() => scrollToSection(item.href)}
                className="text-white hover:text-[#c85dad] transition-colors font-medium"
              >
                {t(item.key)}
              </motion.button>
            ))}
          </nav>

          {/* Desktop Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex items-center space-x-4"
          >
            <LanguageSelector />
          </motion.div>

          {/* Mobile Controls */}
          <div className="lg:hidden flex items-center space-x-2">
            <LanguageSelector />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-[#c85dad] p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-md"
        >
          <div className="py-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-4 py-2 text-white hover:text-[#c85dad] hover:bg-white/10 transition-colors"
              >
                {t(item.key)}
              </button>
            ))}
          </div>
        </motion.nav>
      </div>
    </motion.header>
  );
};