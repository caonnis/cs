import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Globe, Menu, X } from 'lucide-react';
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

  // Mock news data with categories
  const mockNewsData: NewsItem[] = [
    {
      title: "AI Regulation Framework 2025: New Guidelines for Ethical AI Development",
      description: "European Union releases comprehensive guidelines for AI systems compliance with GDPR, focusing on data minimization and algorithmic transparency in machine learning applications.",
      url: "https://example.com/ai-regulation-2025",
      urlToImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-20T10:00:00Z",
      source: { name: "Tech Compliance Today" },
      category: "ai"
    },
    {
      title: "Global Data Protection Trends: What Companies Need to Know in 2025",
      description: "Analysis of emerging data protection regulations worldwide and their impact on multinational corporations and cross-border data transfers.",
      url: "https://example.com/data-protection-trends",
      urlToImage: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-18T14:30:00Z",
      source: { name: "Privacy Law Review" },
      category: "compliance"
    },
    {
      title: "Blockchain Technology Regulations: A Comprehensive Legal Overview",
      description: "Latest developments in blockchain regulations across different jurisdictions and their implications for businesses adopting distributed ledger technologies.",
      url: "https://example.com/blockchain-regulations",
      urlToImage: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-15T09:15:00Z",
      source: { name: "Blockchain Legal News" },
      category: "tech"
    },
    {
      title: "Building Ethical AI: New Framework for Responsible Development",
      description: "Industry leaders collaborate to establish comprehensive ethical guidelines for AI development, addressing bias, fairness, and accountability in machine learning systems.",
      url: "https://example.com/ethical-ai-framework",
      urlToImage: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-12T16:45:00Z",
      source: { name: "AI Ethics Journal" },
      category: "ai"
    },
    {
      title: "Human Rights Due Diligence in the Digital Age",
      description: "New standards for human rights impact assessments in technology companies, focusing on algorithmic decision-making and digital surveillance practices.",
      url: "https://example.com/human-rights-digital",
      urlToImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-10T11:20:00Z",
      source: { name: "Human Rights Tech" },
      category: "compliance"
    },
    {
      title: "Cybersecurity Trends 2025: Preparing for Next-Generation Threats",
      description: "Emerging cybersecurity challenges and solutions, including AI-powered attacks, quantum computing threats, and zero-trust architecture implementations.",
      url: "https://example.com/cybersecurity-trends-2025",
      urlToImage: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-08T13:10:00Z",
      source: { name: "Cybersecurity Weekly" },
      category: "tech"
    },
    {
      title: "GDPR Compliance in AI Systems: Best Practices for 2025",
      description: "Comprehensive guide on implementing GDPR compliance in artificial intelligence systems, covering data processing, consent management, and privacy by design principles.",
      url: "https://example.com/gdpr-ai-compliance",
      urlToImage: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-05T08:30:00Z",
      source: { name: "Privacy Tech Review" },
      category: "compliance"
    },
    {
      title: "Machine Learning Bias Detection: New Tools and Methodologies",
      description: "Latest developments in detecting and mitigating bias in machine learning algorithms, with focus on fairness metrics and algorithmic auditing techniques.",
      url: "https://example.com/ml-bias-detection",
      urlToImage: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-03T15:20:00Z",
      source: { name: "AI Research Today" },
      category: "ai"
    },
    {
      title: "Quantum Computing Security: Preparing for the Post-Quantum Era",
      description: "How organizations are preparing for quantum computing threats to current encryption methods and implementing quantum-resistant security measures.",
      url: "https://example.com/quantum-security",
      urlToImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
      publishedAt: "2024-12-01T12:45:00Z",
      source: { name: "Quantum Security Journal" },
      category: "tech"
    }
  ];

  const fetchNews = async (pageNum: number = 1, category: string = 'all') => {
    try {
      setLoading(true);
      
      // Using RSS2JSON service (free, no API key required)
      // Alternative: You can also use NewsAPI, but it requires an API key
      const rssFeeds = {
        all: 'https://rss2json.com/api.json?rss_url=https://news.google.com/rss/search?q=artificial+intelligence+OR+data+privacy+OR+compliance+OR+cybersecurity&hl=en-US&gl=US&ceid=US:en',
        ai: 'https://rss2json.com/api.json?rss_url=https://news.google.com/rss/search?q=artificial+intelligence+OR+machine+learning&hl=en-US&gl=US&ceid=US:en',
        compliance: 'https://rss2json.com/api.json?rss_url=https://news.google.com/rss/search?q=data+privacy+OR+GDPR+OR+compliance&hl=en-US&gl=US&ceid=US:en',
        tech: 'https://rss2json.com/api.json?rss_url=https://news.google.com/rss/search?q=cybersecurity+OR+blockchain+OR+technology&hl=en-US&gl=US&ceid=US:en'
      };

      // For demo purposes, we'll use mock data since RSS2JSON might have CORS issues
      // In production, you'd want to proxy this through your backend
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Use mock data for now
      let dataToUse = mockNewsData;
      
      // Add category to items if not present
      dataToUse = dataToUse.map(item => ({
        ...item,
        category: item.category || 'all'
      }));

      if (pageNum === 1) {
        setNewsItems(dataToUse);
      } else {
        // For pagination, add more mock articles
        const moreNews = dataToUse.map((item, index) => ({
          ...item,
          title: `${item.title} - Page ${pageNum}`,
          publishedAt: new Date(Date.now() - (pageNum * 6 + index) * 24 * 60 * 60 * 1000).toISOString()
        }));
        setNewsItems(prev => [...prev, ...moreNews]);
      }

      // Simulate pagination limit
      if (pageNum >= 3) {
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback to mock data
      setNewsItems(mockNewsData);
    } finally {
      setLoading(false);
    }
  };

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
    fetchNews(1, selectedCategory);
  }, [selectedCategory]);

  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchNews(nextPage, selectedCategory);
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setHasMore(true);
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
            <p className="text-white/70 mt-4">Loading news...</p>
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
            >
              <Card className="h-full border border-white/10 bg-black/40 backdrop-blur-xl hover:bg-black/60 transition-all duration-500 overflow-hidden group-hover:shadow-2xl group-hover:shadow-[#c85dad]/20 rounded-2xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={item.urlToImage || "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800"}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
                      <span>{new Date(item.publishedAt).toLocaleDateString()}</span>
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