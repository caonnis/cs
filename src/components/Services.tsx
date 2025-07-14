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
  },
  {
    id: 'human-rights',
    icon: Users,
    titleKey: 'service.human-rights.title',
    descriptionKey: 'service.human-rights.description',
    detailsKey: 'service.human-rights.details',
    benefitsKey: 'service.human-rights.benefits',
  },
  {
    id: 'software-contracts',
    icon: FileText,
    titleKey: 'service.software-contracts.title',
    descriptionKey: 'service.software-contracts.description',
    detailsKey: 'service.software-contracts.details',
    benefitsKey: 'service.software-contracts.benefits',
  },
  {
    id: 'legal-advisory',
    icon: Scale,
    titleKey: 'service.legal-advisory.title',
    descriptionKey: 'service.legal-advisory.description',
    detailsKey: 'service.legal-advisory.details',
    benefitsKey: 'service.legal-advisory.benefits',
  },
  {
    id: 'data-privacy',
    icon: Lock,
    titleKey: 'service.data-privacy.title',
    descriptionKey: 'service.data-privacy.description',
    detailsKey: 'service.data-privacy.details',
    benefitsKey: 'service.data-privacy.benefits',
  },
  {
    id: 'training',
    icon: GraduationCap,
    titleKey: 'service.training.title',
    descriptionKey: 'service.training.description',
    detailsKey: 'service.training.details',
    benefitsKey: 'service.training.benefits',
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
    <section id="services" className="py-20 lg:py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Minimal background elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-96 h-96 opacity-2"
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
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-8">
            Our <span className="font-bold text-[#c85dad]">Services</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
                onClick={() => openServiceModal(service.id)}
              >
                <Card className="h-48 border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 overflow-hidden relative group-hover:shadow-2xl group-hover:shadow-[#c85dad]/20 rounded-2xl">
                  <CardHeader className="text-center pb-4 relative z-10">
                    <CardTitle className="text-lg font-bold text-white group-hover:text-[#c85dad] transition-all duration-300">
                      {t(service.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="text-center relative z-10">
                    <motion.div
                      initial={{ opacity: 0.7 }}
                      whileHover={{ opacity: 1 }}
                      className="flex items-center justify-center text-white/70 group-hover:text-white transition-colors duration-300"
                    >
                      <span className="text-sm font-medium mr-2">Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </motion.div>
                    
                    {/* Service Icon */}
                    <motion.div
                      initial={{ opacity: 0.5 }}
                      whileHover={{ opacity: 1 }}
                      className="mt-4 flex justify-center"
                    >
                      <service.icon className="h-8 w-8 text-white/40 group-hover:text-[#c85dad] transition-colors duration-300" />
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
            onClick={scrollToContact}
            className="group relative overflow-hidden bg-[#c85dad] text-white hover:bg-[#b84ca3] px-10 py-4 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10 flex items-center">
              {t('contact.cta')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </span>
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
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeServiceModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-black border border-white/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-[#c85dad] p-8 text-white relative overflow-hidden rounded-t-3xl">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-x-12 translate-y-12"></div>
                  <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white rounded-full -translate-x-8 -translate-y-8"></div>
                </div>
                
                <div className="relative z-10 flex items-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeServiceModal}
                    className="absolute -top-4 -right-4 text-white hover:bg-white/20 rounded-full w-10 h-10 p-0"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  
                  <div className="flex items-center w-full">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mr-6 border border-white/30">
                      <selectedServiceData.icon className="h-8 w-8 text-[#c85dad]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-bold mb-2 leading-tight">{t(selectedServiceData.titleKey)}</h3>
                      <div className="w-16 h-1 bg-white/40 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8 text-white">
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Overview</h4>
                  <p className="text-white/80 leading-relaxed">
                    {t(selectedServiceData.descriptionKey)}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">What We Offer</h4>
                  <p className="text-white/80 leading-relaxed mb-4">
                    {t(selectedServiceData.detailsKey)}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-4">Key Benefits</h4>
                  <div className="space-y-3">
                    {t(selectedServiceData.benefitsKey).split('•').filter(benefit => benefit.trim()).map((benefit, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-[#c85dad] mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-white/80">{benefit.trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={() => {
                      closeServiceModal();
                      scrollToContact();
                    }}
                    className="flex-1 bg-[#c85dad] text-white hover:bg-[#b84ca3] rounded-lg"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    onClick={closeServiceModal}
                    className="flex-1 border-white/30 text-white hover:bg-white hover:text-gray-900 bg-transparent rounded-lg transition-all duration-300"
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