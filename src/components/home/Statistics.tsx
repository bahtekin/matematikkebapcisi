'use client';

import { Users, BookOpen, Trophy, Video } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Aktif Öğrenci",
    description: "Türkiye&apos;nin dört bir yanından öğrenciler"
  },
  {
    icon: BookOpen,
    value: "1000+",
    label: "Video Ders",
    description: "Detaylı konu anlatımları ve soru çözümleri"
  },
  {
    icon: Trophy,
    value: "%98",
    label: "Başarı Oranı",
    description: "Hedeflerine ulaşan öğrenciler"
  },
  {
    icon: Video,
    value: "24/7",
    label: "Canlı Destek",
    description: "Kesintisiz öğretmen desteği"
  }
];

const Statistics = () => {
  return (
    <section className="py-24 bg-accent/50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Rakamlarla Matematik Kebapçısı
          </h2>
          <p className="text-lg text-muted-foreground">
            Türkiye'nin en büyük online matematik eğitim platformu
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-background border shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold mb-2 text-foreground">{stat.value}</div>
              <div className="text-lg font-medium mb-2 text-foreground">{stat.label}</div>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics; 