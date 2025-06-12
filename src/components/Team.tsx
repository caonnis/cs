import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
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

export const Team = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 lg:py-32 bg-gray-50">
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
            {t('team.title')}
          </h2>
          <p className="text-responsive-md text-gray-600 max-w-3xl mx-auto">
            {t('team.subtitle')}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.nameKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={t(member.nameKey)}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-certainty-deep/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* LinkedIn Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      size="sm"
                      variant="certainty"
                      asChild
                      className="rounded-full w-10 h-10 p-0"
                    >
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`LinkedIn profile of ${t(member.nameKey)}`}
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-certainty-deep mb-2">
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
      </div>
    </section>
  );
};