import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function HakkimizdaPage() {
  const breadcrumbItems = [
    {
      label: "Hakkımızda"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={breadcrumbItems} 
          title="Hakkımızda"
        />

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
          {/* Hakkımızda İçeriği */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Matematik Kebapcısı, 2024 yılında kurulmuş bir eğitim platformudur. Amacımız, matematiği herkes için erişilebilir ve anlaşılır kılmaktır.
            </p>
            
            <h2>Misyonumuz</h2>
            <p>
              Kaliteli matematik eğitimini herkes için erişilebilir kılmak ve öğrencilerin matematiksel düşünme becerilerini geliştirmelerine yardımcı olmak.
            </p>

            <h2>Vizyonumuz</h2>
            <p>
              Türkiye'nin en kapsamlı ve kaliteli online matematik eğitim platformu olmak ve öğrencilerin matematik başarısını artırmak.
            </p>

            <h2>Değerlerimiz</h2>
            <ul>
              <li>Kaliteli Eğitim</li>
              <li>Erişilebilirlik</li>
              <li>Sürekli Gelişim</li>
              <li>Öğrenci Odaklılık</li>
              <li>Yenilikçilik</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 