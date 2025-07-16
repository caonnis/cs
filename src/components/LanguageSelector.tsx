import { Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLanguage, languages, type Language } from '@/hooks/useLanguage';

export const LanguageSelector = () => {
  const { currentLanguage, changeLanguage, isInitialized } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode: Language) => {
    changeLanguage(langCode);
    setIsOpen(false);
    
    // Force immediate UI update
    setTimeout(() => {
      window.dispatchEvent(new Event('languageChanged'));
    }, 0);
  };

  // Don't render until language is initialized
  if (!isInitialized) {
    return (
      <Button variant="ghost" size="sm" className="text-white hover:text-certainty-accent">
        <Globe className="h-4 w-4 mr-2" />
        <span className="hidden sm:inline">🌐</span>
      </Button>
    );
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-white hover:text-certainty-accent">
          <Globe className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">
            {languages.find(lang => lang.code === currentLanguage)?.flag}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`cursor-pointer ${
              currentLanguage === language.code ? 'bg-certainty-soft' : ''
            }`}
          >
            <span className="mr-2">{language.flag}</span>
            {language.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};