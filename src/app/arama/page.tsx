'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseList from '@/components/courses/CourseList';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [filters, setFilters] = useState({
    search: searchQuery,
    categories: [],
    levels: [],
    durations: [],
    priceRange: {
      min: '',
      max: ''
    }
  });

  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      search: searchQuery
    }));
  }, [searchQuery]);

  const breadcrumbItems = [
    {
      label: "Anasayfa",
      href: "/"
    },
    {
      label: "Arama Sonuçları"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Başlık Alanı */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb 
          items={breadcrumbItems} 
          title={`"${searchQuery}" için arama sonuçları`}
          description="Arama kriterlerinize uygun kurslar aşağıda listelenmiştir."
        />
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-8">
        <div className="w-full">
          <CourseList filters={filters} />
        </div>
      </div>
    </main>
  );
} 