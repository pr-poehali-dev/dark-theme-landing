import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadComplete();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50 animate-fade-in">
      <div className="text-center space-y-6">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-semibold text-foreground">Запуск...</h2>
      </div>
    </div>
  );
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-40"
    >
      <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={20} />
    </Button>
  );
};

const QuickLink = ({ title, url, icon }: { title: string; url: string; icon: string }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group"
    >
      <Card className="p-4 hover:bg-accent/50 transition-all duration-200 hover:scale-105 cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <span className="text-2xl">{icon}</span>
          </div>
          <span className="text-sm font-medium">{title}</span>
        </div>
      </Card>
    </a>
  );
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.open(`https://yandex.ru/search/?text=${encodeURIComponent(searchQuery)}`, '_blank');
    }
  };

  const quickLinks = [
    { title: 'YouTube', url: 'https://youtube.com', icon: '📺' },
    { title: 'Gmail', url: 'https://gmail.com', icon: '📧' },
    { title: 'GitHub', url: 'https://github.com', icon: '💻' },
    { title: 'Календарь', url: 'https://calendar.google.com', icon: '📅' },
    { title: 'Карты', url: 'https://yandex.ru/maps', icon: '🗺️' },
    { title: 'Музыка', url: 'https://music.yandex.ru', icon: '🎵' },
  ];

  if (isLoading) {
    return <LoadingScreen onLoadComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto space-y-8 animate-slide-up">
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Поиск
            </h1>
            <p className="text-muted-foreground">Начните поиск в интернете</p>
          </div>

          <form onSubmit={handleSearch} className="animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            <div className="relative group">
              <Icon 
                name="Search" 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" 
                size={20} 
              />
              <Input
                type="text"
                placeholder="Введите поисковый запрос..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg rounded-full border-2 focus:border-primary transition-all duration-200 bg-card shadow-lg hover:shadow-xl"
              />
            </div>
          </form>

          <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <h2 className="text-lg font-semibold text-foreground/80">Быстрый доступ</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {quickLinks.map((link, index) => (
                <div
                  key={link.title}
                  className="animate-scale-in"
                  style={{ animationDelay: `${0.4 + index * 0.05}s`, animationFillMode: 'both' }}
                >
                  <QuickLink {...link} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Cloud" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Погода</h3>
                  <p className="text-sm text-muted-foreground">+18°C, облачно</p>
                  <p className="text-xs text-muted-foreground mt-1">Москва</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Время</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <ThemeToggle />
    </div>
  );
};

export default Index;
