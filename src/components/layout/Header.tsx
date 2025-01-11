'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, Search, User, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // Admin sayfasında ise header'ı gösterme
  if (pathname?.includes('/admin')) {
    return null;
  }

  useEffect(() => {
    setMounted(true);
    // Kullanıcı bilgilerini localStorage'dan al
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Storage event listener ekle
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'user') {
        if (e.newValue) {
          setUser(JSON.parse(e.newValue));
        } else {
          setUser(null);
        }
      }
    };

    // userChange event listener ekle
    const handleUserChange = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('userChange', handleUserChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('userChange', handleUserChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navigation = [
    { name: 'Kurslar', href: '/kurslar' },
    { name: 'Eğitmenler', href: '/egitmenler' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 max-w-[1400px] flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-[140px] h-[50px]">
              <Image 
                src="/logo.png" 
                alt="MatematikKebapcisi Logo" 
                fill
                sizes="140px"
                className="object-contain"
                priority
                quality={100}
              />
            </div>
          </Link>
        </div>

        {/* Masaüstü Navigasyon */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Arama, Tema ve Profil */}
        <div className="flex items-center space-x-4">
          {/* Arama Kutusu */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center relative">
            <input
              type="text"
              placeholder="Kurs ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 w-[200px] lg:w-[300px] rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
            <button
              type="submit"
              className="absolute right-3 h-4 w-4 text-muted-foreground hover:text-foreground"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* Tema Değiştirici */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="inline-flex items-center justify-center rounded-md w-9 h-9 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-accent"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {/* Profil Menü */}
          <div className="relative profile-menu">
            {user ? (
              <>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <User className="h-5 w-5" />
                </button>
                
                {/* Profil Dropdown Menü */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-background border">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm border-b">
                        <div className="font-medium">{user.ad} {user.soyad}</div>
                        <div className="text-muted-foreground">{user.email}</div>
                      </div>
                      <Link
                        href="/profil"
                        className="block px-4 py-2 text-sm hover:bg-accent"
                        onClick={() => setIsProfileMenuOpen(false)}
                      >
                        Profilim
                      </Link>
                      {user.rol === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm hover:bg-accent"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Admin Paneli
                        </Link>
                      )}
                      {user.rol === 'TEACHER' && (
                        <Link
                          href="/egitmen"
                          className="block px-4 py-2 text-sm hover:bg-accent"
                          onClick={() => setIsProfileMenuOpen(false)}
                        >
                          Eğitmen Paneli
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-accent flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/giris"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            )}
          </div>

          {/* Mobil Menü Butonu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="inline-flex items-center justify-center md:hidden text-muted-foreground hover:text-foreground transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobil Menü */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="container py-4 space-y-4">
            {/* Mobil Arama */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Kurs ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              />
              <button
                type="submit"
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>

            {/* Mobil Navigasyon */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/profil"
                    className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profilim
                  </Link>
                  {user.rol === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Admin Paneli
                    </Link>
                  )}
                  {user.rol === 'TEACHER' && (
                    <Link
                      href="/egitmen"
                      className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Eğitmen Paneli
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left rounded-lg px-3 py-2 text-base font-medium text-destructive hover:bg-accent transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Çıkış Yap</span>
                  </button>
                </>
              ) : (
                <Link
                  href="/giris"
                  className="block rounded-lg px-3 py-2 text-base font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Giriş Yap
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 