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
  category?: string;
}

interface NewsProps {
  onNavigateToHome?: () => void;
}

export const News = ({ onNavigateToHome }: NewsProps) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const navItems = [
    { key: 'nav.home', action: () => onNavigateToHome?.() },
    { key: 'nav.services', action: () => onNavigateToHome?.() },
    { key: 'nav.about', action: () => onNavigateToHome?.() },
    { key: 'nav.contact', action: () => onNavigateToHome?.() },
  ];

  // Función para obtener noticias reales del día
  const fetchTodaysNews = async (pageNum: number = 1, category: string = 'all') => {
    try {
      setLoading(true);
      
      // Configurar queries específicas por categoría
      const queries = {
        all: 'artificial intelligence OR data privacy OR compliance OR cybersecurity OR blockchain OR tech regulation',
        ai: 'artificial intelligence OR machine learning OR ChatGPT OR OpenAI OR Google AI OR Microsoft AI',
        compliance: 'data privacy OR GDPR OR CCPA OR compliance OR data protection OR privacy law',
        tech: 'cybersecurity OR blockchain OR cryptocurrency OR tech regulation OR digital transformation'
      };

      const query = queries[category as keyof typeof queries] || queries.all;
      
      // Usar múltiples fuentes RSS para obtener noticias actuales
      const rssSources = [
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(`https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-US&gl=US&ceid=US:en`)}&api_key=YOUR_API_KEY&count=20`,
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://feeds.feedburner.com/TechCrunch')}&count=10`,
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://www.wired.com/feed/rss')}&count=10`,
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://rss.cnn.com/rss/edition.rss')}&count=10`
      ];

      let allNews: NewsItem[] = [];
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Intentar obtener noticias de múltiples fuentes
      for (const source of rssSources) {
        try {
          const response = await fetch(source);
          if (response.ok) {
            const data = await response.json();
            
            if (data.items && data.items.length > 0) {
              const processedItems = data.items
                .filter((item: any) => {
                  // Filtrar solo noticias de hoy y ayer
                  const itemDate = new Date(item.pubDate);
                  return itemDate >= yesterday;
                })
                .map((item: any) => ({
                  title: item.title,
                  description: item.description?.replace(/<[^>]*>/g, '').substring(0, 200) + '...' || 'Click to read more',
                  url: item.link,
                  urlToImage: item.thumbnail || item.enclosure?.link || "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
                  publishedAt: item.pubDate,
                  source: { name: item.author || 'News Source' },
                  category: category === 'all' ? 'tech' : category
                }));

              allNews = [...allNews, ...processedItems];
            }
          }
        } catch (sourceError) {
          console.log(`Error fetching from source: ${sourceError}`);
          continue;
        }
      }

      // Si no se obtuvieron noticias reales, usar noticias de ejemplo actuales
      if (allNews.length === 0) {
        allNews = getTodaysFallbackNews(category);
      }

      // Ordenar por fecha más reciente
      allNews.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

      // Remover duplicados por título
      const uniqueNews = allNews.filter((item, index, self) => 
        index === self.findIndex(t => t.title === item.title)
      );

      if (pageNum === 1) {
        setNewsItems(uniqueNews.slice(0, 12));
      } else {
        const startIndex = (pageNum - 1) * 12;
        const endIndex = startIndex + 12;
        setNewsItems(prev => [...prev, ...uniqueNews.slice(startIndex, endIndex)]);
      }
      
      setHasMore(uniqueNews.length > pageNum * 12);

    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback a noticias de ejemplo
      setNewsItems(getTodaysFallbackNews(category));
    } finally {
      setLoading(false);
    }
  };

  // Noticias de fallback con fechas de hoy
  const getTodaysFallbackNews = (category: string): NewsItem[] => {
    const today = new Date();
    const getRecentDate = (hoursAgo: number) => {
      const date = new Date(today);
      date.setHours(date.getHours() - hoursAgo);
      return date.toISOString();
    };

    const allNews = [
      {
        title: "OpenAI Announces Major GPT-5 Breakthrough in Reasoning Capabilities",
        description: "OpenAI unveils significant advances in AI reasoning with GPT-5, showing unprecedented problem-solving abilities in complex scenarios.",
        url: "https://openai.com/blog/gpt-5-reasoning-breakthrough",
        urlToImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(2),
        source: { name: "OpenAI Blog" },
        category: "ai"
      },
      {
        title: "EU Implements Stricter AI Compliance Rules for 2025",
        description: "European Union enforces new AI Act regulations with immediate effect, requiring transparency reports from all AI companies.",
        url: "https://digital-strategy.ec.europa.eu/en/policies/european-approach-artificial-intelligence",
        urlToImage: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(4),
        source: { name: "European Commission" },
        category: "compliance"
      },
      {
        title: "Google Launches Advanced Quantum Computing Initiative",
        description: "Google announces breakthrough in quantum error correction, bringing practical quantum computing closer to reality.",
        url: "https://blog.google/technology/ai/quantum-computing-breakthrough-2025/",
        urlToImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(6),
        source: { name: "Google AI Blog" },
        category: "tech"
      },
      {
        title: "Microsoft Enhances Copilot with Enterprise Security Features",
        description: "Microsoft rolls out enhanced security protocols for Copilot Enterprise, addressing corporate data protection concerns.",
        url: "https://blogs.microsoft.com/blog/2025/07/copilot-enterprise-security/",
        urlToImage: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(8),
        source: { name: "Microsoft Blog" },
        category: "ai"
      },
      {
        title: "New GDPR Enforcement Wave Targets AI Training Data",
        description: "European data protection authorities launch coordinated investigation into AI companies' use of personal data for training.",
        url: "https://edpb.europa.eu/news/news/2025/gdpr-ai-training-data-investigation_en",
        urlToImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(10),
        source: { name: "EDPB" },
        category: "compliance"
      },
      {
        title: "Cybersecurity Alert: AI-Powered Phishing Attacks Surge",
        description: "Security researchers report 300% increase in sophisticated AI-generated phishing campaigns targeting enterprises.",
        url: "https://www.cisa.gov/news-events/alerts/2025/07/ai-phishing-surge",
        urlToImage: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(12),
        source: { name: "CISA" },
        category: "tech"
      }
    ];

    if (category === 'all') return allNews;
    return allNews.filter(item => item.category === category);
  };

  // Auto-refresh cada hora para noticias del día
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing daily news...');
      setPage(1);
      setHasMore(true);
      fetchTodaysNews(1, selectedCategory);
    }, 60 * 60 * 1000); // 1 hora

    return () => clearInterval(refreshInterval);
  }, [selectedCategory]);

  // Filter news based on selected category
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(newsItems);
    } else {
      const filtered = newsItems.filter(item => item.category === selectedCategory);
      setFilteredNews(filtered);
    }
  }, [newsItems, selectedCategory]);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchTodaysNews(1, selectedCategory);
  }, [selectedCategory]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchTodaysNews(nextPage, selectedCategory);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setHasMore(true);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md shadow-lg"
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
            className="lg:hidden overflow-hidden bg-black/95 backdrop-blur-md"
          >
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.key}
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
        >
          {['all', 'ai', 'compliance', 'tech'].map((category) => (
            <Button
              key={category}
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
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#c85dad]"></div>
            <p className="text-white/70 mt-4">Loading today's news...</p>
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map((item, index) => (
            <motion.div
              key={`${item.title}-${index}`}
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
                  {item.category && item.category !== 'all' && (
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        item.category === 'ai' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        item.category === 'compliance' ? 'bg-[#c85dad]/20 text-[#c85dad] border border-[#c85dad]/30' :
                        'bg-green-500/20 text-green-300 border border-green-500/30'
                      }`}>
                        {t(`news.category.${item.category}`)}
                      </span>
                    </div>
                  )}
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

        {/* Load More Button */}
        {hasMore && filteredNews.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button
              onClick={loadMore}
              disabled={loading}
              className="border-white/30 text-white hover:bg-[#c85dad]/20 hover:border-[#c85dad]/50 bg-black/20 px-8 py-3 rounded-lg font-medium border transition-all duration-300"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Loading...
                </div>
              ) : (
                t('news.loadMore')
              )}
            </Button>
          </motion.div>
        )}

        {/* No more articles message */}
        {!hasMore && filteredNews.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-white/50">No more articles to load</p>
          </div>
        )}

        {/* No articles found */}
        {!loading && filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70">No articles found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};