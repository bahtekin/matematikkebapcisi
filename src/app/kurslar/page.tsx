'use client';

import { useState } from 'react';
import CourseList from '../../components/courses/CourseList';
import CourseFilters from '../../components/courses/CourseFilters';

export default function CoursesPage() {
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    levels: [],
    durations: [],
    priceRange: {
      min: '',
      max: ''
    }
  });

  return (
    <main className="flex min-h-screen flex-col">
      {/* Başlık */}
      <div className="bg-accent/50 py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight">
              Matematik Kurslarımız
            </h1>
            <p className="text-xl text-muted-foreground">
              Seviyenize ve hedeflerinize uygun kursları keşfedin
            </p>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="container px-4 md:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filtreler */}
          <aside className="w-full lg:w-72">
            <CourseFilters onFilterChange={setFilters} />
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