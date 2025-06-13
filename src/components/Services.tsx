import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Users, 
  FileText, 
  Scale, 
  Lock, 
  GraduationCap,
  ArrowRight,
  X,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const services = [
  {
    id: 'data-compliance',
    icon: Shield,
    titleKey: 'service.data-compliance.title',
    descriptionKey: 'service.data-compliance.description',
    detailsKey: 'service.data-compliance.details',
    benefitsKey: 'service.data-compliance.benefits',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'human-rights',
    icon: Users,
    titleKey: 'service.human-rights.title',
    descriptionKey: 'service.human-rights.description',
    detailsKey: 'service.human-rights.details',
    benefitsKey: 'service.human-rights.benefits',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'software-contracts',
    icon: FileText,
    titleKey: 'service.software-contracts.title',
    descriptionKey: 'service.software-contracts.description',
    detailsKey: 'service.software-contracts.details',
    benefitsKey: 'service.software-contracts.benefits',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'legal-advisory',
    icon: Scale,
    titleKey: 'service.legal-advisory.title',
    descriptionKey: 'service.legal-advisory.description',
    detailsKey: 'service.legal-advisory.details',
    benefitsKey: 'service.legal-advisory.benefits',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'data-privacy',
    icon: Lock,
    titleKey: 'service.data-privacy.title',
    descriptionKey: 'service.data-privacy.description',
    detailsKey: 'service.data-privacy.details',
    benefitsKey: 'service.data-privacy.benefits',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    gradient: 'from-red-500 to-red-600'
  },
  {
    id: 'training',
    icon: GraduationCap,
    titleKey: 'service.training.title',
    descriptionKey: 'service.training.description',
    detailsKey: 'service.training.details',
    benefitsKey: 'service.training.benefits',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    gradient: 'from-indigo-500 to-indigo-600'
  }
];

export const Services = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openServiceModal = (serviceId: string) => {
    setSelectedService(serviceId);
    document.body.style.overflow = 'hidden';
  };

  const closeServiceModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-certainty-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-certainty-soft rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-certainty-accent to-certainty-soft rounded-full mb-6"
          >
            <Shield className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-responsive-lg font-bold text-certainty-deep mb-6">
            {t('services.title')}
          </h2>
          <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                onClick={() => openServiceModal(service.id)}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm overflow-hidden relative">
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                  
                  <CardHeader className="text-center pb-4 relative z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl ${service.bgColor} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      <Icon className={`h-10 w-10 ${service.color}`} />
                    </motion.div>
                    
                    <CardTitle className="text-xl font-bold text-certainty-deep group-hover:text-certainty-accent transition-colors duration-300">
                      {t(service.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center relative z-10">
                    <motion.div
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                      className="flex items-center justify-center text-certainty-accent group-hover:text-certainty-deep transition-colors duration-300"
                    >
                      <span className="text-sm font-medium mr-2">Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
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
            className="group shadow-xl hover:shadow-2xl"
          >
            {t('contact.cta')}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService && selectedServiceData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeServiceModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`bg-gradient-to-r ${selectedServiceData.gradient} p-8 text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeServiceModal}
                    className="absolute top-0 right-0 text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mr-4">
                      <selectedServiceData.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold">{t(selectedServiceData.titleKey)}</h3>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-certainty-deep mb-4">Overview</h4>
                  <p className="text-gray-600 leading-relaxed">
                    {t(selectedServiceData.descriptionKey)}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-certainty-deep mb-4">What We Offer</h4>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {t(selectedServiceData.detailsKey)}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-certainty-deep mb-4">Key Benefits</h4>
                  <div className="space-y-3">
                    {t(selectedServiceData.benefitsKey).split('•').filter(benefit => benefit.trim()).map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{benefit.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="certainty"
                    onClick={() => {
                      closeServiceModal();
                      scrollToContact();
                    }}
                    className="flex-1"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="certainty-outline"
                    onClick={closeServiceModal}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};