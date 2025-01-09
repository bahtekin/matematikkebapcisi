import Image from 'next/image';
import { GraduationCap, Users, Award, Target } from 'lucide-react';

const stats = [
  {
    icon: <GraduationCap className="w-6 h-6" />,
    value: "10,000+",
    label: "Öğrenci"
  },
  {
    icon: <Users className="w-6 h-6" />,
    value: "50+",
    label: "Eğitmen"
  },
  {
    icon: <Award className="w-6 h-6" />,
    value: "95%",
    label: "Başarı Oranı"
  },
  {
    icon: <Target className="w-6 h-6" />,
    value: "1000+",
    label: "Hedefine Ulaşan"
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-accent/50">
        <div className="container px-4 md:px-6 py-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Matematik Eğitiminde Yeni Nesil Yaklaşım
            </h1>
            <p className="text-lg text-muted-foreground">
              Öğrencilerimizin başarısı için çıktığımız bu yolda, kaliteli eğitimi herkes için erişilebilir kılmayı hedefliyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="py-16 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hikayemiz */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-xl overflow-hidden">
              <Image
                src="/about/team.jpg"
                alt="Ekibimiz"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Hikayemiz</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  2023 yılında, matematik eğitimini daha erişilebilir ve etkili hale getirme vizyonuyla yola çıktık. Amacımız, öğrencilerin matematik öğrenme deneyimini kökten değiştirmek ve her öğrencinin potansiyelini maksimuma çıkarmasına yardımcı olmaktı.
                </p>
                <p className="text-muted-foreground">
                  Bugün, binlerce öğrenciye ulaşan platformumuz, en güncel teknolojileri kullanarak kişiselleştirilmiş öğrenme deneyimleri sunuyor. Deneyimli eğitmen kadromuz ve yenilikçi öğretim yöntemlerimizle, öğrencilerimizin başarı hikayelerine ortak oluyoruz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Değerlerimiz */}
      <div className="py-16 bg-accent/50">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Değerlerimiz</h2>
            <p className="text-muted-foreground">
              Her öğrencinin potansiyelini ortaya çıkarmak için benimsediğimiz temel değerler
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-xl space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Kalite</h3>
              <p className="text-muted-foreground">
                En güncel ve doğru içeriği, en etkili şekilde sunmayı hedefliyoruz.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Erişilebilirlik</h3>
              <p className="text-muted-foreground">
                Kaliteli eğitimi herkes için ulaşılabilir kılmak önceliğimizdir.
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl space-y-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold">Yenilikçilik</h3>
              <p className="text-muted-foreground">
                Sürekli gelişen teknoloji ve eğitim yöntemlerini takip ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 