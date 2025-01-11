'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import CourseList from '../../components/courses/CourseList';
import CourseFilters from '../../components/courses/CourseFilters';
import { Filter, X } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/Breadcrumb';

interface Filters {
  search: string;
  categories: string[];
  levels: string[];
  durations: string[];
  priceRange: {
    min: string;
    max: string;
  };
}

export default function CoursesPage() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get('q') || '',
    categories: [],
    levels: [],
    durations: [],
    priceRange: {
      min: '',
      max: ''
    }
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setFilters(prev => ({
        ...prev,
        search: searchQuery
      }));
    }
  }, [searchParams]);

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const breadcrumbItems = [
    {
      label: "Kurslar"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Başlık Alanı */}
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumb items={breadcrumbItems} title="Kurslar" />
      </div>

      {/* Ana İçerik */}
      <div className="container mx-auto px-4 py-8">
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-lg border shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {showFilters ? (
              <>
                <X className="w-4 h-4" />
                Filtreleri Gizle
              </>
            ) : (
              <>
                <Filter className="w-4 h-4" />
                Filtreleri Göster
              </>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtreler */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-4 lg:h-[calc(100vh-8rem)] lg:overflow-y-auto`}>
            <CourseFilters onFilterChange={handleFilterChange} />
          </aside>

          {/* Kurs Listesi */}
          <div className="flex-1">
            <CourseList filters={filters} />
          </div>
        </div>
      </div>
    </main>
  );
} 