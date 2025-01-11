import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function KullanimSartlariPage() {
  const breadcrumbItems = [
    {
      label: "Kullanım Şartları"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={breadcrumbItems} 
          title="Kullanım Şartları"
        />

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Bu kullanım şartları, Matematik Kebapcısı platformunu kullanırken uymanız gereken kuralları ve şartları belirler.
            </p>

            <h2>1. Hizmet Kullanımı</h2>
            <p>
              Platformumuzun hizmetlerini kullanırken:
            </p>
            <ul>
              <li>18 yaşından büyük olmalısınız veya veli gözetiminde kullanmalısınız</li>
              <li>Doğru ve güncel bilgiler sağlamalısınız</li>
              <li>Hesap güvenliğinizi korumalısınız</li>
              <li>Platform kurallarına uymalısınız</li>
            </ul>

            <h2>2. Üyelik</h2>
            <p>
              Üyelik sürecinde:
            </p>
            <ul>
              <li>Gerçek kimlik bilgilerinizi kullanmalısınız</li>
              <li>Güçlü bir şifre belirlemelisiniz</li>
              <li>Hesap bilgilerinizi güncel tutmalısınız</li>
              <li>Hesabınızı başkalarıyla paylaşmamalısınız</li>
            </ul>

            <h2>3. İçerik Kullanımı</h2>
            <p>
              Platform içeriğini kullanırken:
            </p>
            <ul>
              <li>Telif haklarına saygı göstermelisiniz</li>
              <li>İçerikleri kopyalamamalı veya dağıtmamalısınız</li>
              <li>Sadece kişisel kullanım için indirmelisiniz</li>
              <li>İçerikleri değiştirmemeli veya uyarlamamalısınız</li>
            </ul>

            <h2>4. Ödeme ve İadeler</h2>
            <p>
              Ödeme ve iade süreçlerinde:
            </p>
            <ul>
              <li>Belirtilen ödeme yöntemlerini kullanmalısınız</li>
              <li>İade politikamıza uygun hareket etmelisiniz</li>
              <li>Ödemeleri zamanında yapmalısınız</li>
              <li>Fatura bilgilerinizi doğru girmelisiniz</li>
            </ul>

            <h2>5. Davranış Kuralları</h2>
            <p>
              Platform içinde:
            </p>
            <ul>
              <li>Diğer kullanıcılara saygılı olmalısınız</li>
              <li>Uygunsuz içerik paylaşmamalısınız</li>
              <li>Spam veya taciz edici davranışlarda bulunmamalısınız</li>
              <li>Platform güvenliğini tehdit etmemelisiniz</li>
            </ul>

            <h2>6. Değişiklikler</h2>
            <p>
              Bu kullanım şartlarını zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda kullanıcılarımızı bilgilendireceğiz.
            </p>

            <h2>7. İletişim</h2>
            <p>
              Kullanım şartlarımızla ilgili sorularınız için bizimle iletişime geçebilirsiniz:
              <br />
              E-posta: info@matematikkebapcisi.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 