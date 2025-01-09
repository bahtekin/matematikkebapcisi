'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import CourseList from '@/components/courses/CourseList';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-accent/50">
        <div className="container px-4 md:px-6 py-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Kurs Ara
              </h1>
              <p className="text-lg text-muted-foreground">
                İhtiyacınız olan matematik kursunu bulun
              </p>
            </div>

            {/* Arama Kutusu */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Kurs adı, eğitmen veya konu ara..."
                className="w-full h-14 pl-12 pr-4 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary text-base"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      {/* Arama Sonuçları */}
      <div className="py-12">
        <div className="container px-4 md:px-6">
          {searchQuery ? (
            <>
              <h2 className="text-2xl font-bold mb-8">
                &ldquo;{searchQuery}&rdquo; için arama sonuçları
              </h2>
              <CourseList 
                filters={{
                  search: searchQuery,
                  categories: [],
                  levels: [],
                  durations: [],
                  priceRange: { min: '', max: '' }
                }} 
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                Arama yapmak için yukarıdaki arama kutusunu kullanın
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 