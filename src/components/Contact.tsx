import { motion } from 'framer-motion';
import { Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    description: '+54 911 6117 9711',
    href: 'https://wa.me/5491161179711',
    color: 'text-green-400',
    bgColor: 'from-green-400/20 to-green-600/20'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'info@certainty.solutions',
    href: 'mailto:info@certainty.solutions',
    color: 'text-blue-400',
    bgColor: 'from-blue-400/20 to-blue-600/20'
  },
  {
    icon: MapPin,
    title: 'Locations',
    description: 'Buenos Aires, AR • CDMX, MX',
    href: '#',
    color: 'text-purple-400',
    bgColor: 'from-purple-400/20 to-purple-600/20'
  }
];

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 lg:py-32 bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
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
          className="absolute top-1/4 left-1/4 w-96 h-96 opacity-10"
          style={{
            background: 'linear-gradient(135deg, #c85dad 0%, #4ecdc4 100%)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(100px)',
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
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-light text-white mb-8">
            Get in <span className="font-bold bg-gradient-to-r from-[#c85dad] to-[#4ecdc4] bg-clip-text text-transparent">Touch</span>
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
                <Card className="group h-full border-0 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-[#c85dad]/20">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${method.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm`}>
                      <Icon className={`h-8 w-8 ${method.color}`} />
                    </div>
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
            className="group relative overflow-hidden bg-white text-black hover:bg-white/90 px-10 py-4 text-lg font-medium rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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
              <div className="absolute inset-0 bg-gradient-to-r from-[#c85dad] to-[#4ecdc4] opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};