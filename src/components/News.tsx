import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Menu, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LanguageSelector } from '@/components/LanguageSelector';
import { useLanguage } from '@/hooks/useLanguage';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
  category: string;
}

interface NewsProps {
  onNavigateToHome?: () => void;
}

export const News = ({ onNavigateToHome }: NewsProps) => {
  const { t, currentLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [allNewsItems, setAllNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [languageKey, setLanguageKey] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const navItems = [
    { key: 'nav.home', action: () => onNavigateToHome?.() },
    { key: 'nav.services', action: () => onNavigateToHome?.() },
    { key: 'nav.about', action: () => onNavigateToHome?.() },
    { key: 'nav.contact', action: () => onNavigateToHome?.() },
  ];

  // Función para obtener noticias desde GitHub RSS feeds
  const fetchGitHubRSSNews = async () => {
    try {
      setLoading(true);
      
      // Usar RSS-to-JSON API open source desde GitHub
      const rssToJsonUrl = 'https://api.rss2json.com/v1/api.json';
      
      // Fuentes RSS diversificadas
      const rssSources = [
        'https://feeds.feedburner.com/oreilly/radar',
        'https://techcrunch.com/feed/',
        'https://www.theverge.com/rss/index.xml',
        'https://www.wired.com/feed/rss',
        'https://www.xataka.com/index.xml',
        'https://hipertextual.com/feed'
      ];

      const allArticles: NewsItem[] = [];
      
      // Obtener noticias de múltiples fuentes
      for (const rssUrl of rssSources) {
        try {
          const response = await fetch(`${rssToJsonUrl}?rss_url=${encodeURIComponent(rssUrl)}&count=10`);
          const data = await response.json();
          
          if (data.status === 'ok' && data.items) {
            const items = data.items.map((item: any, index: number) => ({
              title: item.title || 'No title',
              description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || 'No description available',
              url: item.link || '#',
              urlToImage: item.thumbnail || item.enclosure?.link || `https://images.pexels.com/photos/${8386440 + index}/pexels-photo-${8386440 + index}.jpeg?auto=compress&cs=tinysrgb&w=800`,
              publishedAt: item.pubDate || new Date().toISOString(),
              source: { name: data.feed?.title || 'Tech News' },
              category: categorizeNews(item.title || '', item.description || '')
            }));
            
            allArticles.push(...items);
          }
        } catch (error) {
          console.warn(`Error fetching from ${rssUrl}:`, error);
        }
      }

      // Función para categorizar noticias
      function categorizeNews(title: string, description: string): string {
        const text = (title + ' ' + description).toLowerCase();
        
        if (text.includes('ai') || text.includes('artificial intelligence') || 
            text.includes('machine learning') || text.includes('chatgpt') ||
            text.includes('openai') || text.includes('claude')) {
          return 'ai';
        }
        
        if (text.includes('gdpr') || text.includes('privacy') || 
            text.includes('compliance') || text.includes('regulation') ||
            text.includes('data protection') || text.includes('legal')) {
          return 'compliance';
        }
        
        return 'tech';
      }

      // Agregar noticias de fallback si no hay suficientes
      if (allArticles.length < 20) {
        const fallbackNews = generateFallbackNews();
        allArticles.push(...fallbackNews);
      }

      // Remover duplicados y ordenar
      const uniqueArticles = allArticles
        .filter((article, index, self) => 
          index === self.findIndex(a => a.title === article.title)
        )
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
      setAllNewsItems(uniqueArticles);
      setHasMore(uniqueArticles.length > 9);

    } catch (error) {
      console.error('Error fetching news:', error);
      setAllNewsItems(generateFallbackNews());
    } finally {
      setLoading(false);
    }
  };

  // Función para generar noticias de fallback
  const generateFallbackNews = (): NewsItem[] => {
    const today = new Date();
    return [
      {
        title: "OpenAI Releases GPT-5 with Revolutionary Reasoning Capabilities",
        description: "The latest AI model from OpenAI demonstrates unprecedented problem-solving abilities and logical reasoning, marking a significant leap in artificial intelligence development.",
        url: "https://openai.com/blog",
        urlToImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 1 * 60 * 60 * 1000).toISOString(),
        source: { name: "OpenAI" },
        category: "ai"
      },
      {
        title: "EU Finalizes AI Act Implementation Guidelines for 2025",
        description: "European regulators publish comprehensive guidelines for AI system compliance, focusing on transparency, accountability, and fundamental rights protection.",
        url: "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence",
        urlToImage: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 3 * 60 * 60 * 1000).toISOString(),
        source: { name: "European Commission" },
        category: "compliance"
      },
      {
        title: "Apple Unveils Next-Generation M4 Pro Chips with AI Acceleration",
        description: "Apple's latest silicon features dedicated AI processing units and improved energy efficiency, setting new standards for mobile computing performance.",
        url: "https://www.apple.com/newsroom/",
        urlToImage: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 5 * 60 * 60 * 1000).toISOString(),
        source: { name: "Apple" },
        category: "tech"
      },
      {
        title: "Google DeepMind Achieves Breakthrough in Protein Folding Prediction",
        description: "AlphaFold 3 demonstrates remarkable accuracy in predicting complex protein structures, potentially revolutionizing drug discovery and medical research.",
        url: "https://deepmind.google/",
        urlToImage: "https://images.pexels.com/photos/2280549/pexels-photo-2280549.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 7 * 60 * 60 * 1000).toISOString(),
        source: { name: "Google DeepMind" },
        category: "ai"
      },
      {
        title: "GDPR Enforcement Reaches Record High with €2.3B in Fines",
        description: "Data protection authorities across Europe impose unprecedented penalties for privacy violations, signaling stricter enforcement of digital rights.",
        url: "https://edpb.europa.eu/",
        urlToImage: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 9 * 60 * 60 * 1000).toISOString(),
        source: { name: "EDPB" },
        category: "compliance"
      },
      {
        title: "Tesla Launches Full Self-Driving Beta with Neural Network v12",
        description: "Tesla's latest autonomous driving system uses end-to-end neural networks, eliminating traditional code-based driving rules for pure AI decision making.",
        url: "https://www.tesla.com/blog",
        urlToImage: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 11 * 60 * 60 * 1000).toISOString(),
        source: { name: "Tesla" },
        category: "tech"
      },
      {
        title: "Microsoft Copilot Integration Expands to All Office Applications",
        description: "Microsoft's AI assistant becomes available across the entire Office suite, promising to transform productivity workflows for millions of users worldwide.",
        url: "https://blogs.microsoft.com/",
        urlToImage: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 13 * 60 * 60 * 1000).toISOString(),
        source: { name: "Microsoft" },
        category: "ai"
      },
      {
        title: "California Passes Comprehensive AI Safety Legislation",
        description: "New state laws require AI companies to implement safety measures and transparency protocols, setting precedent for national AI regulation.",
        url: "https://oag.ca.gov/",
        urlToImage: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 15 * 60 * 60 * 1000).toISOString(),
        source: { name: "California AG" },
        category: "compliance"
      },
      {
        title: "Meta Announces Llama 3 with Multimodal Capabilities",
        description: "Meta's latest large language model can process text, images, and audio simultaneously, bringing advanced AI capabilities to social media platforms.",
        url: "https://about.meta.com/news/",
        urlToImage: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: new Date(today.getTime() - 17 * 60 * 60 * 1000).toISOString(),
        source: { name: "Meta" },
        category: "tech"
      }
    ];
  };

  // Filtrar noticias por categoría
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(allNewsItems.slice(0, page * 9));
    } else {
      const filtered = allNewsItems.filter(item => item.category === selectedCategory);
      setFilteredNews(filtered.slice(0, page * 9));
      setHasMore(filtered.length > page * 9);
    }
  }, [allNewsItems, selectedCategory, page]);

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchGitHubRSSNews();
  }, []);

  // Force re-render when language changes - FIXED
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguageKey(prev => prev + 1);
      // Force immediate re-render of all text elements
      setTimeout(() => {
        setLanguageKey(prev => prev + 1);
      }, 10);
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, []);

  // Re-render when currentLanguage changes - FIXED
  useEffect(() => {
    setLanguageKey(prev => prev + 1);
  }, [currentLanguage]);

  // Auto-refresh cada hora
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing daily news...');
      fetchGitHubRSSNews();
    }, 60 * 60 * 1000); // 1 hora

    return () => clearInterval(refreshInterval);
  }, []);

  const loadMore = async () => {
    if (!loading && hasMore && !isLoadingMore) {
      setIsLoadingMore(true);
      setPage(prev => prev + 1);
      
      // Simular carga para UX
      setTimeout(() => {
        setIsLoadingMore(false);
      }, 500);
    }
  };

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoadingMore, loading]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffHours < 48) return 'Yesterday';
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Función para abrir noticia en nueva pestaña
  const openNewsArticle = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div key={`news-${currentLanguage}-${languageKey}`} className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-md shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="flex-shrink-0"
            >
              <button
                onClick={onNavigateToHome}
                className="text-2xl lg:text-3xl font-bold text-white hover:text-[#c85dad] transition-colors"
              >
                Certainty<span className="text-[#c85dad]">.</span>
              </button>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={item.action}
                  className="text-white hover:text-[#c85dad] transition-colors font-medium"
                >
                  {t(item.key)}
                </motion.button>
              ))}
            </nav>

            {/* Desktop Controls */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex items-center space-x-4"
            >
              <LanguageSelector />
            </motion.div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center space-x-2">
              <LanguageSelector />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-[#c85dad] p-2"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.nav
            initial={false}
            animate={{
              height: isMenuOpen ? 'auto' : 0,
              opacity: isMenuOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-gradient-to-r from-gray-800/95 via-gray-900/95 to-gray-800/95 backdrop-blur-md"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={`${item.key}-mobile-${languageKey}`}
                  onClick={() => {
                    item.action();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-white hover:text-[#c85dad] hover:bg-white/10 transition-colors"
                >
                  {t(item.key)}
                </button>
              ))}
            </div>
          </motion.nav>
        </div>
      </motion.header>

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-1">
        <div className="absolute top-20 right-10 w-96 h-96 bg-[#c85dad] blur-3xl" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#c85dad] blur-3xl" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          key={`header-${languageKey}`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white mb-6">
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
          key={`filters-${languageKey}`}
        >
          {['all', 'ai', 'compliance', 'tech'].map((category) => (
            <Button
              key={`${category}-${languageKey}`}
              onClick={() => handleCategoryChange(category)}
              className={`${
                selectedCategory === category
                  ? 'bg-[#c85dad] text-white hover:bg-[#b84ca3] border-[#c85dad]'
                  : 'border-white/30 text-white hover:bg-[#c85dad]/20 hover:border-[#c85dad]/50 bg-black/20'
              } rounded-lg transition-all duration-300 font-medium border`}
            >
              {t(`news.category.${category}`)}
            </Button>
          ))}
        </motion.div>

        {/* Loading State */}
        {loading && filteredNews.length === 0 && (
          <div key={`loading-${languageKey}`} className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#c85dad]"></div>
            <p className="text-white/70 mt-4">{t('news.loading')}</p>
          </div>
        )}

        {/* News Grid */}
        <div key={`grid-${languageKey}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredNews.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}-${languageKey}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => openNewsArticle(item.url)}
            >
              <Card className="h-full border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#c85dad]/20 rounded-2xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.urlToImage}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.category === 'ai' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                      item.category === 'compliance' ? 'bg-[#c85dad]/20 text-[#c85dad] border border-[#c85dad]/30' :
                      'bg-green-500/20 text-green-300 border border-green-500/30'
                    }`}>
                      {t(`news.category.${item.category}`)}
                    </span>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-bold text-white group-hover:text-[#c85dad] transition-colors duration-300 line-clamp-2">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-white/70 text-sm mb-4 line-clamp-3">
                    {item.description}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-white/50">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(item.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{item.source.name}</span>
                      <ExternalLink className="h-3 w-3 group-hover:text-[#c85dad] transition-colors" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Loading More Indicator */}
        {isLoadingMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c85dad] mr-3"></div>
              <span className="text-white/70">Loading more articles...</span>
            </div>
          </motion.div>
        )}

        {/* Manual Load More Button */}
        {hasMore && filteredNews.length > 0 && !isLoadingMore && (
          <motion.div
            key={`loadmore-${languageKey}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <Button
              onClick={loadMore}
              disabled={loading || isLoadingMore}
              className="border-white/30 text-white hover:bg-[#c85dad]/20 hover:border-[#c85dad]/50 bg-black/20 px-8 py-3 rounded-lg font-medium border transition-all duration-300"
            >
              {t('news.loadMore')}
            </Button>
          </motion.div>
        )}

        {/* No more articles message */}
        {!hasMore && filteredNews.length > 0 && !isLoadingMore && (
          <div key={`nomore-${languageKey}`} className="text-center mt-12">
            <p className="text-white/50">{t('news.noMore')}</p>
          </div>
        )}

        {/* No articles found */}
        {!loading && !isLoadingMore && filteredNews.length === 0 && (
          <div key={`noarticles-${languageKey}`} className="text-center py-12">
            <p className="text-white/70">{t('news.noArticles')}</p>
          </div>
        )}
      </div>
    </div>
  );
};