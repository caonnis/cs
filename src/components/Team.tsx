import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, ChevronDown, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const teamMembers = [
  {
    nameKey: 'team.estefania.name',
    roleKey: 'team.estefania.role',
    image: '/images/Estefania.png',
    linkedin: 'https://www.linkedin.com/in/estefan%C3%ADa-p-cuello-060755343/'
  },
  {
    nameKey: 'team.ariel.name',
    roleKey: 'team.ariel.role',
    image: '/images/Ariel.png',
    linkedin: 'https://www.linkedin.com/in/onnis/'
  },
  {
    nameKey: 'team.flor.name',
    roleKey: 'team.flor.role',
    image: '/images/Flor.png',
    linkedin: 'https://www.linkedin.com/in/flor-de-magdalena-vargas-ortiz-0a7161345/'
  }
];

const collaborators = [
  {
    nameKey: 'collaborator.andrea.name',
    areaKey: 'collaborator.andrea.area'
  },
  {
    nameKey: 'collaborator.silvina.name',
    areaKey: 'collaborator.silvina.area'
  },
  {
    nameKey: 'collaborator.jose.name',
    areaKey: 'collaborator.jose.area'
  },
  {
    nameKey: 'collaborator.jhonatan.name',
    areaKey: 'collaborator.jhonatan.area'
  },
  {
    nameKey: 'collaborator.dulce.name',
    areaKey: 'collaborator.dulce.area'
  },
  {
    nameKey: 'collaborator.carolina.name',
    areaKey: 'collaborator.carolina.area'
  }
];

export const Team = () => {
  const { t } = useLanguage();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-72 h-72 bg-certainty-accent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-certainty-soft rounded-full blur-3xl"></div>
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
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-certainty-accent to-certainty-soft rounded-full mb-6"
          >
            <Users className="w-8 h-8 text-white" />
          </motion.div>
          
          <h2 className="text-responsive-lg font-bold text-certainty-deep mb-6">
            {t('team.title')}
          </h2>
          <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </motion.div>

        {/* Core Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.nameKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={member.image}
                    alt={t(member.nameKey)}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-certainty-deep/90 via-certainty-deep/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* LinkedIn Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300"
                  >
                    <Button
                      size="sm"
                      variant="certainty"
                      asChild
                      className="rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl"
                    >
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn profile of ${t(member.nameKey)}`}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </Button>
                  </motion.div>

                  {/* Member info overlay */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-500"
                  >
                    <h3 className="text-xl font-bold mb-1">
                      {t(member.nameKey)}
                    </h3>
                    <p className="text-certainty-soft text-sm font-medium">
                      {t(member.roleKey)}
                    </p>
                  </motion.div>
                </div>
                
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-certainty-deep mb-2 group-hover:text-certainty-accent transition-colors duration-300">
                    {t(member.nameKey)}
                  </h3>
                  <p className="text-certainty-accent font-medium">
                    {t(member.roleKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Collaborators Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
            <motion.button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full p-8 text-left bg-gradient-to-r from-certainty-deep to-certainty-accent text-white hover:from-certainty-accent hover:to-certainty-deep transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-6 w-6 mr-4" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('team.collaborators.title')}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {t('team.collaborators.subtitle')}
                    </p>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: isAccordionOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-6 w-6" />
                </motion.div>
              </div>
            </motion.button>

            <AnimatePresence>
              {isAccordionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-8 bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {collaborators.map((collaborator, index) => (
                        <motion.div
                          key={collaborator.nameKey}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-certainty-accent hover:shadow-md transition-shadow duration-300"
                        >
                          <h4 className="font-bold text-certainty-deep mb-2">
                            {t(collaborator.nameKey)}
                          </h4>
                          <p className="text-certainty-accent text-sm font-medium">
                            {t(collaborator.areaKey)}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};