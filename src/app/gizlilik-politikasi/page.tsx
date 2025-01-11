import { Breadcrumb } from '@/components/ui/Breadcrumb';

export default function GizlilikPolitikasiPage() {
  const breadcrumbItems = [
    {
      label: "Gizlilik Politikası"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={breadcrumbItems} 
          title="Gizlilik Politikası"
        />

        <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>
              Bu gizlilik politikası, Matematik Kebapcısı'nın kullanıcılarının gizliliğini korumak için uyguladığı politikaları açıklamaktadır.
            </p>

            <h2>Toplanan Bilgiler</h2>
            <p>
              Sitemizi kullanırken aşağıdaki bilgileri toplayabiliriz:
            </p>
            <ul>
              <li>Ad ve soyad</li>
              <li>E-posta adresi</li>
              <li>Telefon numarası</li>
              <li>Kullanım istatistikleri</li>
              <li>Çerezler ve kullanım verileri</li>
            </ul>

            <h2>Bilgilerin Kullanımı</h2>
            <p>
              Topladığımız bilgileri aşağıdaki amaçlar için kullanıyoruz:
            </p>
            <ul>
              <li>Hizmetlerimizi sunmak ve geliştirmek</li>
              <li>Kullanıcı deneyimini iyileştirmek</li>
              <li>Güvenliği sağlamak</li>
              <li>Yasal yükümlülükleri yerine getirmek</li>
            </ul>

            <h2>Bilgilerin Paylaşımı</h2>
            <p>
              Kişisel bilgilerinizi üçüncü taraflarla paylaşmıyoruz, ancak aşağıdaki durumlarda paylaşım yapabiliriz:
            </p>
            <ul>
              <li>Yasal zorunluluk durumunda</li>
              <li>Kullanıcının açık rızası olduğunda</li>
              <li>Hizmet sağlayıcılarımızla işbirliği kapsamında</li>
            </ul>

            <h2>Güvenlik</h2>
            <p>
              Bilgilerinizin güvenliği için aşağıdaki önlemleri alıyoruz:
            </p>
            <ul>
              <li>SSL şifreleme</li>
              <li>Güvenli veri depolama</li>
              <li>Düzenli güvenlik güncellemeleri</li>
              <li>Erişim kontrolü</li>
            </ul>

            <h2>Çerezler</h2>
            <p>
              Sitemizde çerezler kullanılmaktadır. Çerezler, daha iyi bir kullanıcı deneyimi sunmak için kullanılır.
            </p>

            <h2>Değişiklikler</h2>
            <p>
              Bu gizlilik politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olması durumunda kullanıcılarımızı bilgilendireceğiz.
            </p>

            <h2>İletişim</h2>
            <p>
              Gizlilik politikamızla ilgili sorularınız için bizimle iletişime geçebilirsiniz:
              <br />
              E-posta: privacy@matematikkebapcisi.com
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 