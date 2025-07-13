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

  // Current 2025 news data with recent dates
  const getCurrentNewsData = (): NewsItem[] => {
    const today = new Date();
    const getRecentDate = (daysAgo: number) => {
      const date = new Date(today);
      date.setDate(date.getDate() - daysAgo);
      return date.toISOString();
    };

    return [
      {
        title: "OpenAI Releases GPT-5: Revolutionary AI Model with Enhanced Reasoning Capabilities",
        description: "OpenAI unveils GPT-5 with breakthrough reasoning abilities, multimodal understanding, and improved safety measures. The model shows significant advances in complex problem-solving and ethical AI alignment.",
        url: "https://example.com/gpt-5-release",
        urlToImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(1),
        source: { name: "AI Research Today" },
        category: "ai"
      },
      {
        title: "EU AI Act Implementation: New Compliance Requirements for 2025",
        description: "European Union begins enforcing comprehensive AI regulations with strict compliance requirements for high-risk AI systems. Companies must implement transparency measures and risk assessments.",
        url: "https://example.com/eu-ai-act-2025",
        urlToImage: "https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(2),
        source: { name: "EU Compliance Weekly" },
        category: "compliance"
      },
      {
        title: "Quantum Computing Breakthrough: IBM Achieves 1000-Qubit Milestone",
        description: "IBM's latest quantum processor reaches 1000 qubits with improved error correction, bringing practical quantum computing applications closer to reality for cryptography and drug discovery.",
        url: "https://example.com/quantum-breakthrough",
        urlToImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(3),
        source: { name: "Quantum Tech News" },
        category: "tech"
      },
      {
        title: "Meta Introduces Advanced AI Safety Protocols for Social Media",
        description: "Meta implements new AI-powered content moderation systems with enhanced bias detection and real-time safety monitoring across Facebook, Instagram, and WhatsApp platforms.",
        url: "https://example.com/meta-ai-safety",
        urlToImage: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(4),
        source: { name: "Social Media Safety" },
        category: "ai"
      },
      {
        title: "Global Data Protection Standards: New International Framework Announced",
        description: "International coalition announces unified global data protection standards, harmonizing GDPR, CCPA, and other regional privacy laws for seamless cross-border data transfers.",
        url: "https://example.com/global-data-protection",
        urlToImage: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(5),
        source: { name: "Privacy International" },
        category: "compliance"
      },
      {
        title: "Apple Vision Pro 2: Spatial Computing Revolution Continues",
        description: "Apple announces Vision Pro 2 with improved display technology, longer battery life, and enhanced AR capabilities, setting new standards for spatial computing and mixed reality experiences.",
        url: "https://example.com/vision-pro-2",
        urlToImage: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(6),
        source: { name: "Tech Innovation Daily" },
        category: "tech"
      },
      {
        title: "Microsoft Copilot Enterprise: AI Assistant Gets Major Security Upgrade",
        description: "Microsoft enhances Copilot with enterprise-grade security features, including zero-trust architecture, advanced encryption, and comprehensive audit trails for business environments.",
        url: "https://example.com/copilot-enterprise",
        urlToImage: "https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(7),
        source: { name: "Enterprise AI Weekly" },
        category: "ai"
      },
      {
        title: "Cybersecurity Alert: New AI-Powered Phishing Attacks Detected",
        description: "Security researchers identify sophisticated AI-generated phishing campaigns using deepfake technology and personalized social engineering tactics. New defense strategies recommended.",
        url: "https://example.com/ai-phishing-attacks",
        urlToImage: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(8),
        source: { name: "Cybersecurity Alert" },
        category: "tech"
      },
      {
        title: "GDPR Fines Reach Record High: €2.3 Billion in 2025 Q1",
        description: "European data protection authorities issue record-breaking fines for GDPR violations, with major tech companies facing increased scrutiny over AI training data and user consent practices.",
        url: "https://example.com/gdpr-fines-2025",
        urlToImage: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(9),
        source: { name: "Data Protection News" },
        category: "compliance"
      },
      {
        title: "Tesla FSD Beta 12: Autonomous Driving Reaches New Milestone",
        description: "Tesla's Full Self-Driving Beta 12 demonstrates significant improvements in urban navigation and safety metrics, bringing fully autonomous vehicles closer to widespread deployment.",
        url: "https://example.com/tesla-fsd-12",
        urlToImage: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(10),
        source: { name: "Autonomous Vehicle Today" },
        category: "tech"
      },
      {
        title: "Google Gemini Ultra: Multimodal AI Surpasses Human Performance",
        description: "Google's Gemini Ultra achieves superhuman performance in complex reasoning tasks, demonstrating advanced capabilities in mathematics, coding, and scientific research applications.",
        url: "https://example.com/gemini-ultra",
        urlToImage: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(11),
        source: { name: "AI Breakthrough Journal" },
        category: "ai"
      },
      {
        title: "Blockchain Regulation Update: SEC Approves New Digital Asset Framework",
        description: "US Securities and Exchange Commission approves comprehensive regulatory framework for digital assets, providing clarity for cryptocurrency exchanges and DeFi protocols.",
        url: "https://example.com/sec-blockchain-framework",
        urlToImage: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800",
        publishedAt: getRecentDate(12),
        source: { name: "Blockchain Regulatory News" },
        category: "compliance"
      }
    ];
  };

  const fetchNews = async (pageNum: number = 1, category: string = 'all') => {
    try {
      setLoading(true);
      
      // Try to fetch from RSS2JSON first
      try {
        const rssFeeds = {
          all: 'https://rss2json.com/api.json?rss_url=https://news.google.com/rss/search?q=artificial+intelligence+OR+data+privacy+OR+compliance+OR+cybersecurity&hl=en-US&gl=US&ceid=US:en',
          ai: 'https://rss2json.com/api.json?rss_url=https://news.google.com/rss/search?q=artificial+intelligence+OR+machine+learning&hl=en-US&gl=US&ceid=US:en',
          compliance: 'https://rss2json.com/api.json?rss_url=https://news.google.com/rss/search?q=data+privacy+OR+GDPR+OR+compliance&hl=en-US&gl=US&ceid=US:en',
          tech: 'https://rss2json.com/api.json?rss_url=https://news.google.com/rss/search?q=cybersecurity+OR+blockchain+OR+technology&hl=en-US&gl=US&ceid=US:en'
        };

        const response = await fetch(rssFeeds[category as keyof typeof rssFeeds] || rssFeeds.all);
        
        if (response.ok) {
          const data = await response.json();
          
          if (data.items && data.items.length > 0) {
            const processedItems = data.items.map((item: any) => ({
              title: item.title,
              description: item.description || item.content || 'No description available',
              url: item.link,
              urlToImage: item.thumbnail || "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
              publishedAt: item.pubDate,
              source: { name: item.author || 'News Source' },
              category: category === 'all' ? 'tech' : category
            }));

            if (pageNum === 1) {
              setNewsItems(processedItems);
            } else {
              setNewsItems(prev => [...prev, ...processedItems]);
            }
            
            setHasMore(processedItems.length >= 10);
            setLoading(false);
            return;
          }
        }
      } catch (rssError) {
        console.log('RSS fetch failed, using current news data');
      }

      // Fallback to current 2025 news data
      await new Promise(resolve => setTimeout(resolve, 1000));

      let dataToUse = getCurrentNewsData();
      
      if (pageNum === 1) {
        setNewsItems(dataToUse);
      } else {
        // For pagination, generate more recent articles
        const moreNews = dataToUse.map((item, index) => ({
          ...item,
          title: `${item.title.split(':')[0]}: Latest Update - Page ${pageNum}`,
          publishedAt: new Date(Date.now() - (pageNum * 6 + index) * 12 * 60 * 60 * 1000).toISOString() // 12 hours ago per item
        }));
        setNewsItems(prev => [...prev, ...moreNews]);
      }

      // Simulate pagination limit
      if (pageNum >= 3) {
        setHasMore(false);
      }

    } catch (error) {
      console.error('Error fetching news:', error);
      // Final fallback
      setNewsItems(getCurrentNewsData());
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh news every 24 hours
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing news...');
      setPage(1);
      setHasMore(true);
      fetchNews(1, selectedCategory);
    }, 24 * 60 * 60 * 1000); // 24 hours

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
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
          <div className="flex items-center justify-center mb-6">
            <Globe className="h-8 w-8 text-[#c85dad] mr-3" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-light text-white">
              Latest <span className="font-bold text-[#c85dad]">News</span>
            </h1>
          </div>
          <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
            {t('news.subtitle')}
          </p>
          <p className="text-sm text-white/50 mt-2">
            Updated daily • Last refresh: {new Date().toLocaleDateString()}
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
            <p className="text-white/70 mt-4">Loading latest news...</p>
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
              onClick={() => window.open(item.url, '_blank')}
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