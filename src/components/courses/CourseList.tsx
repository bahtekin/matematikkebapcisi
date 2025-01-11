'use client';

import { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';
import CourseCard from './CourseCard';

interface Course {
  id: number;
  baslik: string;
  slug: string;
  aciklama: string;
  fiyat: number;
  resimUrl: string | null;
  kategori: {
    isim: string;
  };
  ogretmen: {
    ad: string;
    soyad: string;
  };
  _count: {
    dersler: number;
    kayitlar: number;
  };
}

interface CourseListProps {
  filters: {
    search: string;
    categories: string[];
    levels: string[];
    durations: string[];
    priceRange: {
      min: string;
      max: string;
    };
  };
}

export default function CourseList({ filters }: CourseListProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/kurslar');
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Kurslar yüklenirken bir hata oluştu');
        }
        
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error('Kurslar yüklenirken hata:', error);
        setError(error instanceof Error ? error.message : 'Kurslar yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Filtreleme işlemleri
  const filteredCourses = courses.filter(course => {
    // Arama filtresi
    if (filters.search && !course.baslik.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }

    // Kategori filtresi
    if (filters.categories.length > 0 && !filters.categories.includes(course.kategori.isim)) {
      return false;
    }

    // Fiyat aralığı filtresi
    if (filters.priceRange.min && course.fiyat < parseFloat(filters.priceRange.min)) {
      return false;
    }
    if (filters.priceRange.max && course.fiyat > parseFloat(filters.priceRange.max)) {
      return false;
    }

    return true;
  });

  // Sıralama işlemi
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case 'price-asc':
        return a.fiyat - b.fiyat;
      case 'price-desc':
        return b.fiyat - a.fiyat;
      case 'lessons':
        return b._count.dersler - a._count.dersler;
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Bir Hata Oluştu</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Kurs Bulunamadı</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Arama kriterlerinize uygun kurs bulunamadı. Lütfen filtrelerinizi değiştirin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Üst Kısım */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
          <input
            type="text"
            placeholder="Kurs ara..."
            value={filters.search}
            onChange={(e) => filters.search = e.target.value}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Sırala: En Yeni</option>
            <option value="price-asc">Fiyat (Düşükten Yükseğe)</option>
            <option value="price-desc">Fiyat (Yüksekten Düşüğe)</option>
            <option value="lessons">En Çok Ders</option>
          </select>
        </div>
      </div>

      {/* Kurs Listesi */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {sortedCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}