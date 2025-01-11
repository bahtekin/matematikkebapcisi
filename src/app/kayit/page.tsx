'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    examType: '',
    password: '',
    passwordConfirm: '',
    terms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      alert('Şifreler eşleşmiyor!');
      return;
    }

    if (!formData.terms) {
      alert('Kullanım şartlarını ve gizlilik politikasını kabul etmelisiniz!');
      return;
    }

    try {
      const response = await fetch('/api/ogrenciler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          grade: formData.grade,
          examType: formData.examType,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kayıt sırasında bir hata oluştu');
      }

      alert('Kayıt başarılı! Giriş yapabilirsiniz.');
      window.location.href = '/giris';
    } catch (error) {
      console.error('Kayıt hatası:', error);
      alert(error instanceof Error ? error.message : 'Kayıt sırasında bir hata oluştu');
    }
  };

  const grades = [
    { value: '9', label: '9. Sınıf' },
    { value: '10', label: '10. Sınıf' },
    { value: '11', label: '11. Sınıf' },
    { value: '12', label: '12. Sınıf' },
    { value: 'mezun', label: 'Mezun' }
  ];

  const examTypes = [
    { value: 'tyt', label: 'TYT' },
    { value: 'ayt', label: 'AYT' },
    { value: 'both', label: 'TYT ve AYT' },
    { value: 'lgs', label: 'LGS' }
  ];

  return (
    <main className="min-h-screen flex items-center justify-center bg-grid-pattern">
      <div className="w-full max-w-[450px] mx-4 my-8">
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
            className="py-2 px-4 text-sm font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground transition-colors"
          >
            Giriş Yap
          </Link>
          <Link
            href="/kayit"
            className="py-2 px-4 text-sm font-medium border-b-2 border-primary text-foreground"
          >
            Kayıt Ol
          </Link>
        </div>

        {/* Kayıt Formu */}
        <div className="bg-background rounded-xl border p-8 shadow-sm">
          <h1 className="text-2xl font-bold mb-6">Kayıt Ol</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Ad Soyad */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Ad Soyad <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* E-posta */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                E-posta <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Telefon */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Telefon <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="05XX XXX XX XX"
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Sınıf */}
            <div className="space-y-2">
              <label htmlFor="grade" className="text-sm font-medium">
                Sınıf <span className="text-destructive">*</span>
              </label>
              <select
                id="grade"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Sınıfınızı seçin</option>
                {grades.map((grade) => (
                  <option key={grade.value} value={grade.value}>
                    {grade.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Hedef Sınav */}
            <div className="space-y-2">
              <label htmlFor="examType" className="text-sm font-medium">
                Hedef Sınav <span className="text-destructive">*</span>
              </label>
              <select
                id="examType"
                value={formData.examType}
                onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
              >
                <option value="">Hedef sınavınızı seçin</option>
                {examTypes.map((exam) => (
                  <option key={exam.value} value={exam.value}>
                    {exam.label}
                  </option>
                ))}
              </select>
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
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Şifre Tekrar */}
            <div className="space-y-2">
              <label htmlFor="passwordConfirm" className="text-sm font-medium">
                Şifre Tekrar <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPasswordConfirm ? "text" : "password"}
                  id="passwordConfirm"
                  value={formData.passwordConfirm}
                  onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPasswordConfirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Kullanım Şartları */}
            <div className="space-y-4">
              <label className="flex items-start space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                  className="rounded border-gray-300 text-primary focus:ring-primary mt-1"
                  required
                />
                <span>
                  <Link href="/kullanim-sartlari" className="text-primary hover:underline">
                    Kullanım şartlarını
                  </Link>{" "}
                  ve{" "}
                  <Link href="/gizlilik-politikasi" className="text-primary hover:underline">
                    gizlilik politikasını
                  </Link>{" "}
                  okudum, kabul ediyorum.
                </span>
              </label>
            </div>

            {/* Kayıt Butonu */}
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Kayıt Ol
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 