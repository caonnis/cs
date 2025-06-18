import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const rotatingWords = [
  'Privacy & Compliance',
  'Data Protection',
  'Legal Security',
  'Risk Management',
  'Digital Governance'
];

export const Hero = () => {
  const { t } = useLanguage();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated 3D Background Elements */}
      <div className="absolute inset-0">
        {/* Main fluid shape */}
        <motion.div
          initial={{ scale: 0.8, rotate: 0 }}
          animate={{ 
            scale: [0.8, 1.1, 0.9, 1.0],
            rotate: [0, 180, 360],
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-80"
          style={{
            background: 'linear-gradient(135deg, #c85dad 0%, #1f053f 50%, #00ff88 100%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(40px)',
          }}
        />
        
        {/* Secondary fluid shape */}
        <motion.div
          initial={{ scale: 1.2, rotate: 180 }}
          animate={{ 
            scale: [1.2, 0.8, 1.1, 1.0],
            rotate: [180, 0, -180, -360],
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-60"
          style={{
            background: 'linear-gradient(225deg, #ff6b6b 0%, #c85dad 50%, #4ecdc4 100%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            filter: 'blur(50px)',
          }}
        />

        {/* Tertiary accent shape */}
        <motion.div
          initial={{ scale: 0.6, rotate: -90 }}
          animate={{ 
            scale: [0.6, 1.3, 0.8, 1.1],
            rotate: [-90, 270, 90, 450],
          }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/2 right-1/3 w-64 h-64 opacity-40"
          style={{
            background: 'linear-gradient(45deg, #ffd93d 0%, #ff6b6b 50%, #c85dad 100%)',
            borderRadius: '80% 20% 60% 40% / 20% 80% 20% 80%',
            filter: 'blur(60px)',
          }}
        />

        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col justify-center min-h-screen pt-20 lg:pt-0">
          <div className="max-w-6xl mx-auto text-center">
            {/* Main Title with rotating word */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mb-8"
            >
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-tight">
                <span className="block">High Value in</span>
                <div className="block h-[1.2em] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentWordIndex}
                      initial={{ y: 50, opacity: 0, rotateX: -90 }}
                      animate={{ y: 0, opacity: 1, rotateX: 0 }}
                      exit={{ y: -50, opacity: 0, rotateX: 90 }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeInOut"
                      }}
                      className="font-bold bg-gradient-to-r from-[#c85dad] via-[#ff6b6b] to-[#4ecdc4] bg-clip-text text-transparent"
                      style={{
                        textShadow: '0 0 30px rgba(200, 93, 173, 0.5)',
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {rotatingWords[currentWordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons with modern styling */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
            >
              <Button
                size="xl"
                onClick={() => scrollToSection('#services')}
                className="group relative overflow-hidden bg-white text-black hover:bg-white/90 px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center">
                  {t('hero.cta.primary')}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#c85dad] to-[#4ecdc4] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </Button>
              
              <Button
                size="xl"
                variant="outline"
                onClick={() => scrollToSection('#contact')}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-medium rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                {t('hero.cta.secondary')}
              </Button>
            </motion.div>

            {/* Trust Indicators with glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
            >
              {[
                { icon: Shield, text: "GDPR Compliant" },
                { icon: CheckCircle, text: "ISO Certified" },
                { icon: Shield, text: "Expert Team" }
              ].map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-center space-x-3 text-white/70 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300"
                >
                  <item.icon className="h-5 w-5 text-[#c85dad]" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center backdrop-blur-sm"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};