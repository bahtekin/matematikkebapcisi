'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface CourseFiltersProps {
  onFilterChange: (filters: {
    search: string;
    categories: string[];
    levels: string[];
    durations: string[];
    priceRange: {
      min: string;
      max: string;
    };
  }) => void;
}

export default function CourseFilters({ onFilterChange }: CourseFiltersProps) {
  const [kategoriler, setKategoriler] = useState<{ id: number; isim: string }[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    categories: [] as string[],
    levels: [] as string[],
    durations: [] as string[],
    priceRange: {
      min: '',
      max: ''
    }
  });

  useEffect(() => {
    // Kategorileri yükle
    const fetchKategoriler = async () => {
      try {
        const response = await fetch('/api/kategoriler');
        if (!response.ok) throw new Error('Kategoriler yüklenirken bir hata oluştu');
        const data = await response.json();
        setKategoriler(data);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      }
    };

    fetchKategoriler();
  }, []);

  const handleChange = (field: string, value: any) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCheckboxChange = (field: string, value: string) => {
    const currentValues = filters[field as keyof typeof filters] as string[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    handleChange(field, newValues);
  };

  const clearAllFilters = () => {
    const newFilters = {
      search: '',
      categories: [],
      levels: [],
      durations: [],
      priceRange: { min: '', max: '' }
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6">
      {/* Filtre Başlığı */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h3 className="text-lg font-semibold">Filtreler</h3>
        <button
          onClick={clearAllFilters}
          className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1"
        >
          <X className="w-4 h-4" />
          Temizle
        </button>
      </div>

      {/* Kategoriler */}
      <div>
        <h4 className="text-sm font-medium mb-3">Kategoriler</h4>
        <div className="space-y-2">
          {kategoriler.map((kategori) => (
            <label key={kategori.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.categories.includes(kategori.isim)}
                onChange={() => handleCheckboxChange('categories', kategori.isim)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{kategori.isim}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fiyat Aralığı */}
      <div>
        <h4 className="text-sm font-medium mb-3">Fiyat</h4>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Ücretsiz</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="price"
              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600 dark:text-gray-300">Ücretli</span>
          </label>
        </div>
      </div>

      {/* Seviyeler */}
      <div>
        <h4 className="text-sm font-medium mb-3">Seviyeler</h4>
        <div className="space-y-2">
          {['Tüm Seviyeler', 'Başlangıç', 'Orta', 'İleri'].map((seviye) => (
            <label key={seviye} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.levels.includes(seviye)}
                onChange={() => handleCheckboxChange('levels', seviye)}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600 dark:text-gray-300">{seviye}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 