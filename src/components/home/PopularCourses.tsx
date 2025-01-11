'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import CourseCard from '../courses/CourseCard';

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

const CourseSkeleton = () => {
  return (
    <div className="bg-background rounded-xl overflow-hidden border shadow-sm">
      <div className="flex flex-col md:flex-row h-full">
        <div className="relative w-full md:w-64 h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
        <div className="p-5 flex-1">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-2" />
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
          
          <div className="flex items-center gap-4 mb-4">
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="h-6 w-20 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

const PopularCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/kurslar?popular=true');
        if (!response.ok) throw new Error('Kurslar yüklenirken bir hata oluştu');
        const data = await response.json();
        setCourses(data.slice(0, 4)); // Sadece ilk 4 kursu al
      } catch (error) {
        console.error('Kurslar yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-accent/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16">
            <div>
              <div className="h-8 w-64 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
              <div className="h-6 w-96 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
            </div>
            <div className="mt-6 md:mt-0 h-12 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((index) => (
              <CourseSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-accent/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Popüler Kurslarımız
            </h2>
            <p className="text-lg text-muted-foreground">
              En çok tercih edilen kurslarımızla başarıya ulaşın
            </p>
          </div>
          <Link 
            href="/kurslar"
            className="mt-6 md:mt-0 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Tüm Kursları Gör
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;