'use client';

import { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const categories = [
  { id: 'tyt', name: 'TYT', count: 24 },
  { id: 'ayt', name: 'AYT', count: 18 },
  { id: 'lgs', name: 'LGS', count: 16 },
  { id: 'tyt-ayt', name: 'TYT-AYT Ortak', count: 8 },
];

const levels = [
  { id: 'beginner', name: 'Başlangıç', count: 15 },
  { id: 'intermediate', name: 'Orta', count: 25 },
  { id: 'advanced', name: 'İleri', count: 20 },
];

const durations = [
  { id: '0-10', name: '0-10 Saat', count: 12 },
  { id: '10-20', name: '10-20 Saat', count: 18 },
  { id: '20-40', name: '20-40 Saat', count: 15 },
  { id: '40+', name: '40+ Saat', count: 8 },
];

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

interface CourseFiltersProps {
  onFilterChange: (filters: Filters) => void;
}

export default function CourseFilters({ onFilterChange }: CourseFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    categories: [],
    levels: [],
    durations: [],
    priceRange: {
      min: '',
      max: ''
    }
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(id => id !== categoryId)
      : [...filters.categories, categoryId];

    handleFilterChange({
      ...filters,
      categories: newCategories
    });
  };

  const handleLevelChange = (levelId: string) => {
    const newLevels = filters.levels.includes(levelId)
      ? filters.levels.filter(id => id !== levelId)
      : [...filters.levels, levelId];

    handleFilterChange({
      ...filters,
      levels: newLevels
    });
  };

  const handleDurationChange = (durationId: string) => {
    const newDurations = filters.durations.includes(durationId)
      ? filters.durations.filter(id => id !== durationId)
      : [...filters.durations, durationId];

    handleFilterChange({
      ...filters,
      durations: newDurations
    });
  };

  const handleClear = () => {
    handleFilterChange({
      search: '',
      categories: [],
      levels: [],
      durations: [],
      priceRange: { min: '', max: '' }
    });
  };

  return (
    <>
      {/* Mobil Filtre Butonu */}
      <button
        className="lg:hidden w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg mb-4 flex items-center justify-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SlidersHorizontal className="w-4 h-4" />
        Filtreleri {isOpen ? 'Gizle' : 'Göster'}
      </button>

      <div className={`space-y-4 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Arama */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Kurs ara..."
            value={filters.search}
            onChange={(e) => handleFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-4 py-2 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Filtreler */}
        <div className="space-y-4 bg-background rounded-lg border p-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Filtreler</h3>
            {Object.values(filters).some(v => Array.isArray(v) ? v.length > 0 : v) && (
              <button 
                onClick={handleClear}
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Temizle
              </button>
            )}
          </div>

          {/* Kategoriler */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Kategoriler
            </h4>
            <div className="space-y-1">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{category.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">({category.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Seviyeler */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Seviye</h4>
            <div className="space-y-1">
              {levels.map((level) => (
                <label key={level.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.levels.includes(level.id)}
                    onChange={() => handleLevelChange(level.id)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{level.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">({level.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Süre */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Süre</h4>
            <div className="space-y-1">
              {durations.map((duration) => (
                <label key={duration.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.durations.includes(duration.id)}
                    onChange={() => handleDurationChange(duration.id)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{duration.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">({duration.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fiyat Aralığı */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Fiyat Aralığı</h4>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange.min}
                onChange={(e) => handleFilterChange({
                  ...filters,
                  priceRange: { ...filters.priceRange, min: e.target.value }
                })}
                className="w-full px-3 py-1 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange.max}
                onChange={(e) => handleFilterChange({
                  ...filters,
                  priceRange: { ...filters.priceRange, max: e.target.value }
                })}
                className="w-full px-3 py-1 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Uygula Butonu - Mobilde Görünür */}
          <button 
            onClick={() => setIsOpen(false)}
            className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors lg:hidden"
          >
            Filtreleri Uygula
          </button>
        </div>
      </div>
    </>
  );
} 