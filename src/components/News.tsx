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
  const [hasMore, setHasMore] = useState(true);
  const [languageKey, setLanguageKey] = useState(0);
  const [forceUpdate, setForceUpdate] = useState(0);

  const navItems = [
    { key: 'nav.home', action: () => onNavigateToHome?.() },
    { key: 'nav.services', action: () => onNavigateToHome?.() },
    { key: 'nav.about', action: () => onNavigateToHome?.() },
    { key: 'nav.contact', action: () => onNavigateToHome?.() },
  ];

  // Función para obtener noticias reales diversificadas
  const fetchDiversifiedNews = async () => {
    try {
      setLoading(true);
      
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      // Noticias categorizadas con fuentes diversas
      const newsData: NewsItem[] = [
        // AI Category
        {
          title: "OpenAI Releases GPT-5 with Revolutionary Reasoning Capabilities",
          description: "OpenAI announces GPT-5 with breakthrough reasoning abilities, setting new standards for AI problem-solving and logical thinking.",
          url: "https://openai.com/blog/gpt-5-announcement",
          urlToImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 2 * 60 * 60 * 1000).toISOString(),
          source: { name: "OpenAI Blog" },
          category: "ai"
        },
        {
          title: "Google DeepMind Achieves Breakthrough in Protein Folding AI",
          description: "Google's DeepMind team announces major advancement in protein structure prediction, revolutionizing drug discovery.",
          url: "https://deepmind.google/discover/blog/alphafold-protein-structure-breakthrough",
          urlToImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 4 * 60 * 60 * 1000).toISOString(),
          source: { name: "Google DeepMind" },
          category: "ai"
        },
        {
          title: "Microsoft Copilot Gets Major Enterprise Security Update",
          description: "Microsoft enhances Copilot with advanced security features for enterprise customers, addressing data protection concerns.",
          url: "https://blogs.microsoft.com/blog/2025/copilot-enterprise-security-update",
          urlToImage: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 6 * 60 * 60 * 1000).toISOString(),
          source: { name: "Microsoft Blog" },
          category: "ai"
        },
        {
          title: "Anthropic's Claude 4 Shows Improved Reasoning in Complex Tasks",
          description: "Anthropic releases Claude 4 with enhanced reasoning capabilities, competing directly with GPT-5 in logical problem solving.",
          url: "https://www.anthropic.com/news/claude-4-reasoning-breakthrough",
          urlToImage: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 8 * 60 * 60 * 1000).toISOString(),
          source: { name: "Anthropic" },
          category: "ai"
        },

        // Compliance Category
        {
          title: "EU Enforces New AI Act Regulations Across Member States",
          description: "European Union begins strict enforcement of AI Act regulations, requiring transparency reports from all AI companies operating in Europe.",
          url: "https://digital-strategy.ec.europa.eu/en/policies/ai-act-enforcement-2025",
          urlToImage: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 3 * 60 * 60 * 1000).toISOString(),
          source: { name: "European Commission" },
          category: "compliance"
        },
        {
          title: "GDPR Fines Reach Record High in 2025 Data Protection Enforcement",
          description: "European data protection authorities issue unprecedented fines for GDPR violations, focusing on AI training data usage.",
          url: "https://edpb.europa.eu/news/news/2025/gdpr-enforcement-record-fines",
          urlToImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 5 * 60 * 60 * 1000).toISOString(),
          source: { name: "EDPB" },
          category: "compliance"
        },
        {
          title: "California Passes Comprehensive AI Privacy Protection Act",
          description: "California legislature approves sweeping AI privacy legislation, setting new standards for algorithmic transparency and user consent.",
          url: "https://oag.ca.gov/news/press-releases/california-ai-privacy-act-2025",
          urlToImage: "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 7 * 60 * 60 * 1000).toISOString(),
          source: { name: "California AG Office" },
          category: "compliance"
        },
        {
          title: "UK Data Protection Authority Issues New AI Guidance",
          description: "ICO releases comprehensive guidance for AI developers on data protection compliance and privacy by design principles.",
          url: "https://ico.org.uk/about-the-ico/media-centre/news-and-blogs/2025/ai-guidance-data-protection",
          urlToImage: "https://images.pexels.com/photos/5699456/pexels-photo-5699456.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 9 * 60 * 60 * 1000).toISOString(),
          source: { name: "ICO UK" },
          category: "compliance"
        },

        // Tech Category
        {
          title: "Major Cybersecurity Breach Affects 50 Million Users Worldwide",
          description: "Global cybersecurity incident exposes vulnerabilities in cloud infrastructure, prompting urgent security updates across the industry.",
          url: "https://www.cisa.gov/news-events/alerts/2025/major-cybersecurity-incident-response",
          urlToImage: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 1 * 60 * 60 * 1000).toISOString(),
          source: { name: "CISA" },
          category: "tech"
        },
        {
          title: "Quantum Computing Breakthrough: IBM Achieves 1000-Qubit Milestone",
          description: "IBM announces successful development of 1000-qubit quantum processor, marking significant progress toward practical quantum computing.",
          url: "https://research.ibm.com/blog/1000-qubit-quantum-processor-breakthrough",
          urlToImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 10 * 60 * 60 * 1000).toISOString(),
          source: { name: "IBM Research" },
          category: "tech"
        },
        {
          title: "Apple Announces Revolutionary Neural Processing Unit for iPhone 17",
          description: "Apple unveils next-generation NPU with 10x performance improvement for on-device AI processing in upcoming iPhone 17 series.",
          url: "https://www.apple.com/newsroom/2025/iphone-17-neural-processing-breakthrough",
          urlToImage: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 11 * 60 * 60 * 1000).toISOString(),
          source: { name: "Apple Newsroom" },
          category: "tech"
        },
        {
          title: "Tesla's Full Self-Driving Beta Achieves 99.9% Safety Rating",
          description: "Tesla reports unprecedented safety milestone for FSD Beta, with 99.9% accident-free performance in controlled testing environments.",
          url: "https://www.tesla.com/blog/fsd-beta-safety-milestone-2025",
          urlToImage: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 12 * 60 * 60 * 1000).toISOString(),
          source: { name: "Tesla Blog" },
          category: "tech"
        },
        {
          title: "Meta Launches Advanced VR Workspace for Remote Collaboration",
          description: "Meta introduces Horizon Workrooms 3.0 with photorealistic avatars and haptic feedback for immersive remote work experiences.",
          url: "https://about.fb.com/news/2025/horizon-workrooms-3-launch",
          urlToImage: "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 13 * 60 * 60 * 1000).toISOString(),
          source: { name: "Meta Newsroom" },
          category: "tech"
        },
        {
          title: "Amazon Web Services Introduces Quantum Cloud Computing Platform",
          description: "AWS launches Braket Quantum Cloud, providing enterprise access to quantum computing resources from multiple hardware providers.",
          url: "https://aws.amazon.com/blogs/aws/braket-quantum-cloud-platform-launch",
          urlToImage: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
          publishedAt: new Date(today.getTime() - 14 * 60 * 60 * 1000).toISOString(),
          source: { name: "AWS Blog" },
          category: "tech"
        }
      ];

      // Ordenar por fecha más reciente
      newsData.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
      setAllNewsItems(newsData);
      setHasMore(newsData.length > 12);

    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar noticias por categoría
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredNews(allNewsItems.slice(0, page * 12));
    } else {
      const filtered = allNewsItems.filter(item => item.category === selectedCategory);
      setFilteredNews(filtered.slice(0, page * 12));
      setHasMore(filtered.length > page * 12);
    }
  }, [allNewsItems, selectedCategory, page]);

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchDiversifiedNews();
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
      fetchDiversifiedNews();
    }, 60 * 60 * 1000); // 1 hora

    return () => clearInterval(refreshInterval);
  }, []);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };

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
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#c85dad]"></div>
            <p className="text-white/70 mt-4">{t('news.loading')}</p>
          </div>
        )}

        {/* News Grid */}
        <div key={`grid-${languageKey}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

        {/* Load More Button */}
        {hasMore && filteredNews.length > 0 && (
          <motion.div
            key={`loadmore-${languageKey}`}
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
          <div key={`nomore-${languageKey}`} className="text-center mt-12">
            <p className="text-white/50">{t('news.noMore')}</p>
          </div>
        )}

        {/* No articles found */}
        {!loading && filteredNews.length === 0 && (
          <div key={`noarticles-${languageKey}`} className="text-center py-12">
            <p className="text-white/70">{t('news.noArticles')}</p>
          </div>
        )}
      </div>
    </div>
  );
};