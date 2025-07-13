import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: '+54 911 6117 9711',
    href: 'https://wa.me/5491161179711',
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'info@certainty.solutions',
    href: 'mailto:info@certainty.solutions',
  },
  {
    icon: MapPin,
    title: 'Locations',
    description: 'Buenos Aires, AR • CDMX, MX',
    href: '#',
  }
];

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, -360],
            scale: [1, 1.3, 1],
          }}
          transition={{ 
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-2"
          style={{
            background: '#c85dad',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(120px)',
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-8">
            Get in <span className="font-bold text-[#c85dad]">Touch</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className="group h-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#c85dad]/20 rounded-2xl">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-xl font-bold text-white">
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    {method.href !== '#' ? (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/70 hover:text-white transition-colors font-medium hover:underline"
                      >
                        {method.description}
                      </a>
                    ) : (
                      <p className="text-white/70 font-medium">
                        {method.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Main CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button
            size="xl"
            asChild
            className="group relative overflow-hidden bg-white text-black hover:bg-white/90 px-10 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <a
              href="https://wa.me/5491161179711"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="relative z-10 flex items-center">
                <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                {t('contact.cta')}
              </span>
              <div className="absolute inset-0 bg-[#c85dad] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};