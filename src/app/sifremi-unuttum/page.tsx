'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Şifre sıfırlama e-postası gönderme işlemleri burada yapılacak
    console.log(email);
    setIsSent(true);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-grid-pattern">
      <div className="w-full max-w-[450px] mx-4 -mt-32">
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

        {/* Form */}
        <div className="bg-background rounded-xl border p-8 shadow-sm">
          <Link 
            href="/giris"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Giriş sayfasına dön
          </Link>

          <h1 className="text-2xl font-bold mb-2">Şifremi Unuttum</h1>
          <p className="text-muted-foreground mb-6">
            E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.
          </p>
          
          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* E-posta */}
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  E-posta <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              {/* Gönder Butonu */}
              <button
                type="submit"
                className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                Şifre Sıfırlama Bağlantısı Gönder
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-lg font-medium">E-posta Gönderildi!</h2>
              <p className="text-muted-foreground">
                Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.
              </p>
              <Link
                href="/giris"
                className="inline-block mt-4 text-sm text-primary hover:underline"
              >
                Giriş sayfasına dön
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 