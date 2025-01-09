'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Ayşe Yılmaz",
    role: "TYT Birincisi",
    image: "/testimonials/student1.jpg",
    content: "Matematik Kebapçısı sayesinde TYT matematikte tam puan yaptım. Özellikle video çözümleri ve canlı dersler çok faydalıydı.",
    rating: 5
  },
  {
    id: 2,
    name: "Mehmet Demir",
    role: "AYT Öğrencisi",
    image: "/testimonials/student2.jpg",
    content: "Geometri konusunda çok zorlanıyordum. Buradaki öğretmenlerin anlatımı sayesinde geometri sorularını çözmeye başladım.",
    rating: 5
  },
  {
    id: 3,
    name: "Zeynep Kaya",
    role: "LGS Öğrencisi",
    image: "/testimonials/student3.jpg",
    content: "Matematik derslerini çok sevmezdim ama buradaki eğlenceli anlatım sayesinde matematiğe olan bakış açım değişti.",
    rating: 5
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Öğrencilerimizin Başarı Hikayeleri
          </h2>
          <p className="text-lg text-muted-foreground">
            Binlerce öğrencimizden bazılarının deneyimleri
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="flex flex-col p-6 bg-background border rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-12 h-12">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              
              <p className="flex-1 text-muted-foreground mb-6">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 