'use client';

import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Star, BookOpen } from 'lucide-react';

interface Egitmen {
  id: number;
  ad: string;
  soyad: string;
  biyografi: string | null;
  resimUrl: string | null;
  _count: {
    kurslar: number;
    kayitlar: number;
  };
  rating: number;
}

export default function Egitmenler() {
  const [egitmenler, setEgitmenler] = useState<Egitmen[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbItems = [
    {
      label: "Eğitmenler"
    }
  ];

  useEffect(() => {
    async function fetchEgitmenler() {
      try {
        const response = await fetch('/api/egitmenler');
        if (!response.ok) {
          throw new Error('Eğitmenler yüklenirken bir hata oluştu');
        }
        const data = await response.json();
        setEgitmenler(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }

    fetchEgitmenler();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-red-500 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <Breadcrumb 
          items={breadcrumbItems}
          title="Eğitmenler"
        />

        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Eğitmenlerimiz
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Alanında uzman eğitmenlerimizle birlikte öğrenme yolculuğunuza başlayın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {egitmenler.map((egitmen) => (
            <div
              key={egitmen.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={egitmen.resimUrl || 'https://via.placeholder.com/400x400'}
                  alt={`${egitmen.ad} ${egitmen.soyad}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {egitmen.ad} {egitmen.soyad}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {egitmen.biyografi || 'Biyografi henüz eklenmemiş.'}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary mb-1">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {egitmen._count?.kurslar || 0}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Kurs</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-primary mb-1">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {egitmen._count?.kayitlar || 0}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Öğrenci</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center text-yellow-400 mb-1">
                      <Star className="w-5 h-5" />
                    </div>
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {egitmen.rating?.toFixed(1) || '0.0'}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Puan</div>
                  </div>
                </div>

                <Link
                  href={`/egitmenler/${egitmen.id}`}
                  className="block w-full py-2 px-4 bg-primary text-white text-center rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Profili Görüntüle
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 