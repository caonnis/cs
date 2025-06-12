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
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'info@certainty.solutions',
    href: 'mailto:info@certainty.solutions',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: MapPin,
    title: 'Locations',
    description: 'Buenos Aires, AR • CDMX, MX',
    href: '#',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  }
];

export const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 lg:py-32 gradient-bg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-responsive-lg font-bold text-white mb-6">
            {t('contact.title')}
          </h2>
          <p className="text-responsive-md text-white/90 max-w-3xl mx-auto">
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
              >
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2 bg-white/95 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${method.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${method.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-certainty-deep">
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    {method.href !== '#' ? (
                      <a
                        href={method.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-certainty-accent transition-colors font-medium"
                      >
                        {method.description}
                      </a>
                    ) : (
                      <p className="text-gray-600 font-medium">
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
            variant="certainty-soft"
            asChild
            className="group"
          >
            <a
              href="https://wa.me/5491161179711"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              {t('contact.cta')}
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};