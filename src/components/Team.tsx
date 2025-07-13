import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

const allCollaborators = [
  // Core team members first
  {
    nameKey: 'team.estefania.name',
    areaKey: 'team.estefania.role',
    isCore: true
  },
  {
    nameKey: 'team.ariel.name',
    areaKey: 'team.ariel.role',
    isCore: true
  },
  {
    nameKey: 'team.flor.name',
    areaKey: 'team.flor.role',
    isCore: true
  },
  // External collaborators
  {
    nameKey: 'collaborator.andrea.name',
    areaKey: 'collaborator.andrea.area',
    isCore: false
  },
  {
    nameKey: 'collaborator.silvina.name',
    areaKey: 'collaborator.silvina.area',
    isCore: false
  },
  {
    nameKey: 'collaborator.jose.name',
    areaKey: 'collaborator.jose.area',
    isCore: false
  },
  {
    nameKey: 'collaborator.jhonatan.name',
    areaKey: 'collaborator.jhonatan.area',
    isCore: false
  },
  {
    nameKey: 'collaborator.dulce.name',
    areaKey: 'collaborator.dulce.area',
    isCore: false
  },
  {
    nameKey: 'collaborator.carolina.name',
    areaKey: 'collaborator.carolina.area',
    isCore: false
  }
];

export const Team = () => {
  const { t } = useLanguage();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  return (
    <section id="about" className="py-20 lg:py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Minimal background decoration */}
      <div className="absolute inset-0 opacity-2">
        <div className="absolute top-20 right-10 w-72 h-72 bg-[#c85dad] blur-3xl" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#c85dad] blur-3xl" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
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
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
            Our <span className="font-bold text-[#c85dad]">Expert Team</span>
          </h2>
          <p className="text-lg text-white/70 max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </motion.div>

        {/* Team Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <Card className="border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden rounded-2xl">
            <motion.button
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              className="w-full p-8 text-center bg-[#c85dad] text-white hover:bg-[#b84ca3] transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {t('team.collaborators.title')}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {t('team.collaborators.subtitle')}
                    </p>
                  </div>
                </div>
                <motion.div className="absolute right-8"
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
                  <div className="p-8 bg-black">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {allCollaborators.map((collaborator, index) => (
                        <motion.div
                          key={collaborator.nameKey}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`bg-white/5 backdrop-blur-sm p-6 rounded-lg border-l-4 ${
                            collaborator.isCore ? 'border-[#c85dad]' : 'border-white/30'
                          } hover:bg-white/10 transition-all duration-300`}
                        >
                          <div>
                            <h4 className={`font-bold mb-2 ${
                              collaborator.isCore ? 'text-white' : 'text-white'
                            }`}>
                              {t(collaborator.nameKey)}
                            </h4>
                            <p className="text-white/70 text-sm font-medium">
                              {t(collaborator.areaKey)}
                            </p>
                          </div>
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