import { motion } from 'framer-motion';
import { Instagram, Linkedin, Mail, MessageCircle, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const socialLinks = [
  {
    icon: Instagram,
    href: 'https://www.instagram.com/certainty.solutions',
    label: 'Instagram'
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/company/certainty-solutions/',
    label: 'LinkedIn'
  },
  {
    icon: Mail,
    href: 'mailto:info@certainty.solutions',
    label: 'Email'
  },
  {
    icon: MessageCircle,
    href: 'https://wa.me/5491161179711',
    label: 'WhatsApp'
  }
];

const footerLinks = [
  { key: 'nav.about', href: '#about' },
  { key: 'nav.services', href: '#services' },
];

const legalLinks = [
  { text: 'Terms and Conditions', href: '/terms-and-condition.html' },
  { text: 'Privacy Policy', href: '/privacy-policy.html' }
];

export const Footer = () => {
  const { t } = useLanguage();

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(href, '_blank');
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 60,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-1"
          style={{
            background: 'linear-gradient(135deg, #c85dad 0%, #4ecdc4 100%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(120px)',
          }}
        />
        
        <motion.div
          animate={{ 
            rotate: [360, 0],
            scale: [1.1, 0.9, 1.1],
          }}
          transition={{ 
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-1"
          style={{
            background: 'linear-gradient(225deg, #ff6b6b 0%, #c85dad 100%)',
            borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-3xl font-bold mb-4">
              Certainty<span className="text-[#c85dad]">.</span>
            </h3>
            <p className="text-white/80 leading-relaxed">
              {t('footer.description')}
            </p>
          </motion.div>

          {/* Useful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#c85dad] to-[#4ecdc4] bg-clip-text text-transparent">
              {t('footer.links')}
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-[#c85dad] transition-all duration-300"
                  >
                    {t(link.key)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#c85dad] to-[#4ecdc4] bg-clip-text text-transparent">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.text}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-[#c85dad] transition-all duration-300"
                  >
                    {link.text}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 bg-gradient-to-r from-[#c85dad] to-[#4ecdc4] bg-clip-text text-transparent">
              {t('footer.contact')}
            </h4>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-[#c85dad] transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>

            {/* Locations */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="h-4 w-4 text-[#c85dad]" />
                <span className="text-sm">Argentina, Buenos Aires</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="h-4 w-4 text-[#4ecdc4]" />
                <span className="text-sm">Mexico, CDMX</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-white/10 mt-12 pt-8 text-center"
        >
          <p className="text-white/60">
            © 2025 <span className="text-[#c85dad] font-semibold">Certainty</span>. {t('footer.rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};