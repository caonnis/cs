import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  FileText, 
  Scale, 
  Lock, 
  GraduationCap,
  ArrowRight 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const services = [
  {
    icon: Shield,
    titleKey: 'service.data-compliance.title',
    descriptionKey: 'service.data-compliance.description',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Users,
    titleKey: 'service.human-rights.title',
    descriptionKey: 'service.human-rights.description',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: FileText,
    titleKey: 'service.software-contracts.title',
    descriptionKey: 'service.software-contracts.description',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Scale,
    titleKey: 'service.legal-advisory.title',
    descriptionKey: 'service.legal-advisory.description',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Lock,
    titleKey: 'service.data-privacy.title',
    descriptionKey: 'service.data-privacy.description',
    color: 'text-red-500',
    bgColor: 'bg-red-50'
  },
  {
    icon: GraduationCap,
    titleKey: 'service.training.title',
    descriptionKey: 'service.training.description',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50'
  }
];

export const Services = () => {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-responsive-lg font-bold text-certainty-deep mb-6">
            {t('services.title')}
          </h2>
          <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.titleKey}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${service.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-certainty-deep group-hover:text-certainty-accent transition-colors">
                      {t(service.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {t(service.descriptionKey)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Button
            size="xl"
            variant="certainty"
            onClick={scrollToContact}
            className="group"
          >
            {t('contact.cta')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};