'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get('returnUrl') || '/';
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/giris', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          sifre: formData.password
        }),
      });

      // Önce yanıtın text olarak alınması
      const text = await res.text();
      
      // Text'in JSON olarak parse edilmesi
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error('API Yanıtı:', text);
        throw new Error('Sunucudan geçersiz yanıt alındı');
      }

      if (!res.ok) {
        throw new Error(data.message || 'Giriş yapılırken bir hata oluştu');
      }

      // Token ve kullanıcı bilgilerini localStorage'a kaydet
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Kullanıcı değişikliği eventi
      window.dispatchEvent(new Event('userChange'));
      
      // Giriş başarılı, returnUrl'e yönlendir
      router.push(returnUrl);
      
    } catch (error: any) {
      setError(error.message);
      console.error('Giriş hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-grid-pattern">
      <div className="w-full max-w-[450px] mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link href="/" className="relative w-[240px] h-[85px]">
            <Image 
              src="/logo.png" 
              alt="MatematikKebapcisi Logo" 
              fill
              sizes="240px"
              className="object-contain"
              priority
              quality={100}
            />
          </Link>
        </div>

        {/* Üst Navigasyon */}
        <div className="flex justify-center space-x-6 mb-8">
          <Link
            href="/giris"
            className="py-2 px-4 text-sm font-medium border-b-2 border-primary text-foreground"
          >
            Giriş Yap
          </Link>
          <Link
            href="/kayit"
            className="py-2 px-4 text-sm font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
          >
            Kayıt Ol
          </Link>
        </div>

        {/* Giriş Formu */}
        <div className="bg-background rounded-xl border p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-6">Giriş Yap</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            
            {/* E-posta */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-posta veya kullanıcı adı <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={loading}
              />
            </div>

            {/* Şifre */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Şifre <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Beni Hatırla & Şifremi Unuttum */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.remember}
                  onChange={(e) => setFormData({ ...formData, remember: e.target.checked })}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  disabled={loading}
                />
                <span>Beni hatırla</span>
              </label>
              <Link
                href="/sifremi-unuttum"
                className="text-sm text-primary hover:underline"
              >
                Şifremi unuttum
              </Link>
            </div>

            {/* Giriş Butonu */}
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
            </button>

            {/* Veya */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">veya</span>
              </div>
            </div>

            {/* Google ile Giriş */}
            <button
              type="button"
              onClick={() => console.log('Google ile giriş')}
              className="w-full flex items-center justify-center space-x-2 py-2.5 border rounded-lg hover:bg-accent transition-colors font-medium"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google ile giriş yap</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 