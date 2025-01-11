'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const pathname = usePathname();

  // Admin sayfasında ise footer'ı gösterme
  if (pathname?.includes('/admin')) {
    return null;
  }

  const quickLinks = [
    { name: 'Kurslar', href: '/kurslar' },
    { name: 'Eğitmenler', href: '/egitmenler' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'SSS', href: '/sss' },
    { name: 'Blog', href: '/blog' },
  ];

  const courseCategories = [
    { name: 'TYT Matematik', href: '/kurslar/tyt-matematik' },
    { name: 'AYT Matematik', href: '/kurslar/ayt-matematik' },
    { name: 'LGS Matematik', href: '/kurslar/lgs-matematik' },
    { name: 'KPSS Matematik', href: '/kurslar/kpss-matematik' },
    { name: 'DGS Matematik', href: '/kurslar/dgs-matematik' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Youtube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="w-full border-t border-border/40 bg-background/95">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Hakkımızda */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Matematik Kebapcısı</h3>
            <p className="text-sm text-muted-foreground">
              Matematik öğrenmenin en eğlenceli ve etkili yolu. Online dersler, soru bankası ve daha fazlası.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Hızlı Erişim */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Hızlı Erişim</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kurs Kategorileri */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Kurs Kategorileri</h3>
            <ul className="space-y-2">
              {courseCategories.map((category) => (
                <li key={category.name}>
                  <Link
                    href={category.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>info@matematikkebapcisi.com</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+90 (555) 123 45 67</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1" />
                <span>Matematik Sokak, No: 3.14<br />Eğitim Mahallesi, İstanbul</span>
              </li>
            </ul>
          </div>

          {/* Mobil Uygulama */}
          <div className="space-y-4 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold text-foreground">Mobil Uygulama</h3>
            <p className="text-sm text-muted-foreground">
              Yakında App Store ve Google Play'de!
            </p>
            {/* Buraya app store ve play store butonları eklenebilir */}
          </div>
        </div>

        {/* Alt Footer */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Matematik Kebapcısı. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link href="/gizlilik-politikasi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Gizlilik Politikası
              </Link>
              <Link href="/kullanim-sartlari" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 