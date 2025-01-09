'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users } from 'lucide-react';

const allCourses = [
  {
    id: 1,
    slug: 'tyt-matematik-sifirdan-zirveye',
    title: "TYT Matematik Sıfırdan Zirveye",
    instructor: "Dr. Ahmet Yılmaz",
    rating: 4.9,
    students: 1234,
    duration: "40 saat",
    lessons: 120,
    image: "/courses/tyt-mat.png",
    price: "₺299",
    tag: "tyt",
    level: "beginner",
    description: "TYT matematikte sıfırdan zirveye çıkmanızı sağlayacak kapsamlı eğitim serisi."
  },
  {
    id: 2,
    slug: 'ayt-matematik-geometri-kampi',
    title: "AYT Matematik Geometri Kampı",
    instructor: "Ayşe Demir",
    rating: 4.8,
    students: 856,
    duration: "35 saat",
    lessons: 90,
    image: "/courses/tyt-mat.png",
    price: "₺349",
    tag: "ayt",
    level: "advanced",
    description: "AYT geometri konularını derinlemesine öğrenin, zor soruları kolayca çözün."
  },
  {
    id: 3,
    slug: 'lgs-matematik-soru-bankasi-cozumleri',
    title: "LGS Matematik Soru Bankası Çözümleri",
    instructor: "Mehmet Kaya",
    rating: 4.9,
    students: 2156,
    duration: "28 saat",
    lessons: 75,
    image: "/courses/tyt-mat.png",
    price: "₺249",
    tag: "lgs",
    level: "intermediate",
    description: "LGS matematik sorularını çözme teknikleriyle birlikte öğrenin."
  },
  {
    id: 4,
    slug: 'tyt-ayt-trigonometri-ozel-ders',
    title: "TYT-AYT Trigonometri Özel Ders",
    instructor: "Zeynep Şahin",
    rating: 4.7,
    students: 943,
    duration: "25 saat",
    lessons: 60,
    image: "/courses/tyt-mat.png",
    price: "₺399",
    tag: "tyt-ayt",
    level: "advanced",
    description: "Trigonometri konularını özel ders kalitesinde öğrenin."
  },
  // Daha fazla kurs eklenebilir
];

interface CourseListProps {
  filters?: {
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

const CourseList = ({ filters }: CourseListProps) => {
  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  useEffect(() => {
    if (!filters) {
      setFilteredCourses(allCourses);
      return;
    }

    let result = [...allCourses];

    // Arama filtresi
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(course => 
        course.title.toLowerCase().includes(searchLower) ||
        course.description.toLowerCase().includes(searchLower) ||
        course.instructor.toLowerCase().includes(searchLower)
      );
    }

    // Kategori filtresi
    if (filters.categories.length > 0) {
      result = result.filter(course => filters.categories.includes(course.tag));
    }

    // Seviye filtresi
    if (filters.levels.length > 0) {
      result = result.filter(course => filters.levels.includes(course.level));
    }

    // Süre filtresi
    if (filters.durations.length > 0) {
      result = result.filter(course => {
        const duration = parseInt(course.duration);
        return filters.durations.some(range => {
          if (range === '40+') return duration >= 40;
          const [min, max] = range.split('-').map(Number);
          return duration >= min && duration < max;
        });
      });
    }

    // Fiyat aralığı filtresi
    if (filters.priceRange.min || filters.priceRange.max) {
      result = result.filter(course => {
        const price = parseInt(course.price.replace('₺', ''));
        const min = filters.priceRange.min ? parseInt(filters.priceRange.min) : 0;
        const max = filters.priceRange.max ? parseInt(filters.priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredCourses(result);
  }, [filters]);

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-semibold mb-2">Kurs Bulunamadı</h3>
        <p className="text-muted-foreground">
          Arama kriterlerinize uygun kurs bulunamadı. Lütfen filtrelerinizi değiştirin.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          {filteredCourses.length} kurs bulundu
        </p>
        <select className="bg-background border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="popular">Popülerlik</option>
          <option value="price-asc">Fiyat (Artan)</option>
          <option value="price-desc">Fiyat (Azalan)</option>
          <option value="rating">Puan</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course) => (
          <Link 
            href={`/kurslar/${course.slug}`}
            key={course.id}
            className="group bg-background rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full"
          >
            <div className="relative h-48">
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-sm font-medium bg-primary/90 text-primary-foreground">
                {course.tag.toUpperCase()}
              </div>
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            
            <div className="p-5">
              <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {course.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                {course.instructor}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {course.students}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-bold text-lg">{course.price}</span>
                <span className="text-sm text-primary font-medium">Detaylar →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList; 