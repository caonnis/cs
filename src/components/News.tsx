import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, ExternalLink, Globe, TrendingUp, Shield, Cpu } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

interface NewsItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  category: 'ai' | 'compliance' | 'tech';
  date: string;
  readTime: string;
  imageUrl: string;
  externalUrl?: string;
}

const newsData: NewsItem[] = [
  {
    id: '1',
    titleKey: 'news.ai.gdpr-compliance',
    descriptionKey: 'news.ai.gdpr-compliance.desc',
    category: 'ai',
    date: '2024-12-20',
    readTime: '5 min',
    imageUrl: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '2',
    titleKey: 'news.compliance.data-protection',
    descriptionKey: 'news.compliance.data-protection.desc',
    category: 'compliance',
    date: '2024-12-18',
    readTime: '7 min',
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '3',
    titleKey: 'news.tech.blockchain-regulations',
    descriptionKey: 'news.tech.blockchain-regulations.desc',
    category: 'tech',
    date: '2024-12-15',
    readTime: '6 min',
    imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '4',
    titleKey: 'news.ai.ethics-framework',
    descriptionKey: 'news.ai.ethics-framework.desc',
    category: 'ai',
    date: '2024-12-12',
    readTime: '8 min',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '5',
    titleKey: 'news.compliance.human-rights',
    descriptionKey: 'news.compliance.human-rights.desc',
    category: 'compliance',
    date: '2024-12-10',
    readTime: '6 min',
    imageUrl: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: '6',
    titleKey: 'news.tech.cybersecurity-trends',
    descriptionKey: 'news.tech.cybersecurity-trends.desc',
    category: 'tech',
    date: '2024-12-08',
    readTime: '5 min',
    imageUrl: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

const categoryIcons = {
  ai: Cpu,
  compliance: Shield,
  tech: TrendingUp
};

const categoryColors = {
  ai: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  compliance: 'bg-[#c85dad]/10 text-[#c85dad] border-[#c85dad]/20',
  tech: 'bg-green-500/10 text-green-400 border-green-500/20'
};

export const News = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredNews = selectedCategory === 'all' 
    ? newsData 
    : newsData.filter(item => item.category === selectedCategory);

  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-2">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#c85dad] blur-3xl" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#c85dad] blur-3xl" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Button
            onClick={goBack}
            variant="ghost"
            className="mb-8 text-white hover:text-[#c85dad] hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('news.back')}
          </Button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-[#c85dad] rounded-2xl mb-8"
          >
            <Globe className="w-8 h-8 text-white" />
          </motion.div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-8">
            Latest <span className="font-bold text-[#c85dad]">News</span>
          </h1>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t('news.subtitle')}
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['all', 'ai', 'compliance', 'tech'].map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className={`${
                selectedCategory === category
                  ? 'bg-[#c85dad] text-white hover:bg-[#b84ca3]'
                  : 'border-white/20 text-white hover:bg-white/10'
              } rounded-lg transition-all duration-300`}
            >
              {t(`news.category.${category}`)}
            </Button>
          ))}
        </motion.div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => {
            const CategoryIcon = categoryIcons[item.category];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#c85dad]/20 rounded-2xl">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={t(item.titleKey)}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    
                    {/* Category Badge */}
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full border ${categoryColors[item.category]} backdrop-blur-sm`}>
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="h-3 w-3" />
                        <span className="text-xs font-medium">{t(`news.category.${item.category}`)}</span>
                      </div>
                    </div>
                  </div>

                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-bold text-white group-hover:text-[#c85dad] transition-colors duration-300 line-clamp-2">
                      {t(item.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-white/70 text-sm mb-4 line-clamp-3">
                      {t(item.descriptionKey)}
                    </p>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{item.readTime}</span>
                        <ExternalLink className="h-3 w-3 group-hover:text-[#c85dad] transition-colors" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg"
          >
            {t('news.loadMore')}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};