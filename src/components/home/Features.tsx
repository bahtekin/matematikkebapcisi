'use client';

import { Book, Users, Clock, Award, Video, Star } from 'lucide-react';

const features = [
  {
    icon: Book,
    title: "Kapsamlı Müfredat",
    description: "TYT, AYT ve LGS için özel hazırlanmış detaylı konu anlatımları ve soru çözümleri."
  },
  {
    icon: Video,
    title: "Video Dersler",
    description: "Uzman öğretmenler tarafından hazırlanmış, anlaşılır ve interaktif video dersler."
  },
  {
    icon: Users,
    title: "Birebir Mentorluk",
    description: "Kişisel gelişiminizi takip eden ve size özel çalışma programı hazırlayan mentorlar."
  },
  {
    icon: Clock,
    title: "7/24 Erişim",
    description: "Dilediğiniz zaman, dilediğiniz yerden tüm içeriklere sınırsız erişim imkanı."
  },
  {
    icon: Star,
    title: "Soru Bankası",
    description: "10.000+ özgün soru ve detaylı çözüm videoları ile pratik yapma imkanı."
  },
  {
    icon: Award,
    title: "Başarı Garantisi",
    description: "Düzenli takip ve çalışma ile hedeflerinize ulaşmanız için tam destek."
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Neden Matematik Kebapçısı?
          </h2>
          <p className="text-lg text-muted-foreground">
            Başarıya giden yolda size özel hazırlanmış özelliklerimiz
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative p-6 bg-background border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </div>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 