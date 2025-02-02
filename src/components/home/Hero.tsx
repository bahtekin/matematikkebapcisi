'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const words = useMemo(() => ["Eşitlik", "Hedefler", "Problem Çözme", "Gelecek", "Hayaller"], []);
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const icons = [
    { id: 1, src: "/icons/math1.png", alt: "Toplama", style: { top: "10%", right: "-15%" } },
    { id: 2, src: "/icons/math2.png", alt: "Çarpma", style: { top: "30%", right: "-18%" } },
    { id: 3, src: "/icons/math3.png", alt: "Bölme", style: { top: "50%", right: "-15%" } },
    { id: 4, src: "/icons/math4.png", alt: "Eşitlik", style: { top: "70%", right: "-18%" } },
    { id: 5, src: "/icons/math5.png", alt: "İntegral", style: { top: "10%", left: "-18%" } },
    { id: 6, src: "/icons/math6.png", alt: "Türev", style: { top: "30%", left: "-15%" } },
    { id: 7, src: "/icons/math7.png", alt: "Pi", style: { top: "50%", left: "-18%" } },
    { id: 8, src: "/icons/math8.png", alt: "Delta", style: { top: "70%", left: "-15%" } },
  ];

  useEffect(() => {
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const pauseTime = 1000;

    const getCurrentWord = () => words[wordIndex];

    const type = () => {
      const currentWord = getCurrentWord();

      if (!isDeleting) {
        if (displayText !== currentWord) {
          setDisplayText(currentWord.substring(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
          return;
        }
      } else {
        if (displayText === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          return;
        }
        setDisplayText(currentWord.substring(0, displayText.length - 1));
      }
    };

    const timer = setTimeout(type, isDeleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, wordIndex, words]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/arama?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Arkaplan Deseni */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.07]" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between min-h-[calc(85vh-4rem)] py-8">
          {/* Sol Taraf - İçerik */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 lg:pr-8">
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight">
              Matematiğin Gücüyle
              <span className="text-primary block mt-2">{displayText}<span className="animate-pulse">|</span></span>
            </h1>
            
            <p className="text-base text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Matematikle hayallerinize ulaşın. Sorunları çözün, hedeflerinizi şekillendirin ve yeni başarılar keşfedin.
            </p>

            {/* Arama Kutusu */}
            <div className="relative max-w-xl mx-auto lg:mx-0 z-10">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Kurs ara... (örn: Türev, İntegral)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 pr-12 text-sm border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-12 pr-3 flex items-center"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <ArrowRight className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              </form>
            </div>

            {/* CTA Butonları */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start relative z-20">
              <Link 
                href="/kurslar"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Kurslara Göz At
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link 
                href="/iletisim"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium border border-input bg-background rounded-lg hover:bg-accent transition-colors"
              >
                İletişim
              </Link>
            </div>

            {/* Özellikler Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Image
                    src="/icons/video.png"
                    alt="Problem Icon"
                    width={24}
                    height={24}
                    className="dark:invert"
                    quality={100}
                  />
                </div>
                <h3 className="text-base font-semibold">10,000+ Matematik Problemi</h3>
                <p className="text-xs text-muted-foreground">Farklı seviyelerde problemlere erişim sağlayın.</p>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Image
                    src="/icons/teacher.png"
                    alt="Teacher Icon"
                    width={24}
                    height={24}
                    className="dark:invert"
                    quality={100}
                  />
                </div>
                <h3 className="text-base font-semibold">Uzman Eğitmenler</h3>
                <p className="text-xs text-muted-foreground">Alanında uzman eğitmenlerden ders alın.</p>
              </div>

              <div className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 rounded-lg hover:bg-accent/50 transition-colors">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 mb-3">
                  <Image
                    src="/icons/access.png"
                    alt="Access Icon"
                    width={24}
                    height={24}
                    className="dark:invert"
                    quality={100}
                  />
                </div>
                <h3 className="text-base font-semibold">Ömür Boyu Erişim</h3>
                <p className="text-xs text-muted-foreground">Satın aldığınız içeriklere her zaman erişim sağlayın.</p>
              </div>
            </div>
          </div>

          {/* Sağ Taraf - Görsel ve İkonlar */}
          <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
            <div className="relative w-full max-w-md mx-auto">
              {/* Yüzen İkonlar - Sadece masaüstünde görünür */}
              {icons.map((icon) => (
                <div
                  key={icon.id}
                  className="absolute w-12 h-12 hidden lg:flex justify-center items-center rounded-xl shadow-lg bg-background dark:bg-accent"
                  style={{
                    ...icon.style,
                    animation: `float ${icon.id % 2 === 0 ? '3s' : '4s'} infinite`,
                    zIndex: 10,
                  }}
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={32}
                    height={32}
                    className="object-contain dark:invert"
                    quality={100}
                  />
                </div>
              ))}

              {/* Ana Görsel */}
              <div className="relative w-full aspect-square flex items-center justify-center hidden lg:flex">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-primary/0 rounded-full animate-pulse" 
                     style={{ 
                       width: '450px',
                       height: '450px',
                       left: '50%',
                       top: '50%',
                       transform: 'translate(-50%, -50%)'
                     }} 
                />
                <div className="relative w-[400px] h-[400px]">
                  <Image
                    src="/icons/hero-image.png"
                    alt="Matematik Eğitimi"
                    fill
                    className="object-contain"
                    quality={100}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-10px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Hero; 