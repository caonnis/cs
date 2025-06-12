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
    <footer className="bg-certainty-deep text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h3 className="text-2xl font-bold mb-4">
              Certainty<span className="text-certainty-accent">.</span>
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
            <h4 className="text-lg font-semibold mb-4 text-certainty-accent">
              {t('footer.links')}
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.key}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-certainty-accent transition-colors"
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
            <h4 className="text-lg font-semibold mb-4 text-certainty-accent">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.text}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-certainty-accent transition-colors"
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
            <h4 className="text-lg font-semibold mb-4 text-certainty-accent">
              {t('footer.contact')}
            </h4>
            
            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-certainty-accent transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>

            {/* Locations */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="h-4 w-4 text-certainty-accent" />
                <span className="text-sm">Argentina, Buenos Aires</span>
              </div>
              <div className="flex items-center space-x-2 text-white/80">
                <MapPin className="h-4 w-4 text-certainty-accent" />
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
            © 2025 Certainty. {t('footer.rights')}
          </p>
        </motion.div>
      </div>
    </footer>
  );
};