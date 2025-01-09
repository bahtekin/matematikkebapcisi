'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Clock, Users } from 'lucide-react';

const courses = [
  {
    id: 1,
    slug: 'tyt-matematik-sifirdan-zirveye',
    title: "TYT Matematik Sıfırdan Zirveye",
    instructor: "Dr. Ahmet Yılmaz",
    rating: 4.9,
    students: 1234,
    duration: "40 saat",
    image: "/courses/tyt-mat.png",
    price: "₺299",
    tag: "TYT"
  },
  {
    id: 2,
    slug: 'ayt-matematik-geometri-kampi',
    title: "AYT Matematik Geometri Kampı",
    instructor: "Ayşe Demir",
    rating: 4.8,
    students: 856,
    duration: "35 saat",
    image: "/courses/tyt-mat.png",
    price: "₺349",
    tag: "AYT"
  },
  {
    id: 3,
    slug: 'lgs-matematik-soru-bankasi-cozumleri',
    title: "LGS Matematik Soru Bankası Çözümleri",
    instructor: "Mehmet Kaya",
    rating: 4.9,
    students: 2156,
    duration: "28 saat",
    image: "/courses/tyt-mat.png",
    price: "₺249",
    tag: "LGS"
  },
  {
    id: 4,
    slug: 'tyt-ayt-trigonometri-ozel-ders',
    title: "TYT-AYT Trigonometri Özel Ders",
    instructor: "Zeynep Şahin",
    rating: 4.7,
    students: 943,
    duration: "25 saat",
    image: "/courses/tyt-mat.png",
    price: "₺399",
    tag: "TYT/AYT"
  }
];

const PopularCourses = () => {
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course) => (
            <Link 
              href={`/kurslar/${course.slug}`}
              key={course.id}
              className="group bg-background rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="relative h-48">
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-sm font-medium bg-primary/90 text-primary-foreground">
                  {course.tag}
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
    </section>
  );
};

export default PopularCourses; 