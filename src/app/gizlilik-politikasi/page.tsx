import { Shield, Lock, Eye, FileText } from 'lucide-react';

const sections = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Kişisel Verilerin Korunması",
    content: "Kişisel verileriniz 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında korunmaktadır. Toplanan veriler, yalnızca hizmet kalitemizi artırmak ve yasal yükümlülüklerimizi yerine getirmek amacıyla kullanılmaktadır."
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "Veri Güvenliği",
    content: "Verileriniz endüstri standardı güvenlik protokolleri ve şifreleme yöntemleri kullanılarak korunmaktadır. Düzenli güvenlik değerlendirmeleri ve güncellemeler ile sistemlerimizin güvenliği sürekli olarak sağlanmaktadır."
  },
  {
    icon: <Eye className="w-6 h-6" />,
    title: "Çerez Politikası",
    content: "Web sitemizde kullanıcı deneyimini iyileştirmek için çerezler kullanılmaktadır. Bu çerezler, tercihlerinizi hatırlamak ve size daha iyi bir hizmet sunmak için gereklidir."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Veri Kullanımı",
    content: "Toplanan veriler, eğitim içeriklerinin kişiselleştirilmesi, kullanıcı deneyiminin iyileştirilmesi ve yasal yükümlülüklerin yerine getirilmesi amacıyla kullanılmaktadır."
  }
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-accent/50">
        <div className="container px-4 md:px-6 py-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Gizlilik Politikası
            </h1>
            <p className="text-lg text-muted-foreground">
              Verilerinizin güvenliği ve gizliliği bizim için önemlidir. Bu politika, verilerinizin nasıl toplandığını ve kullanıldığını açıklar.
            </p>
          </div>
        </div>
      </div>

      {/* Ana İçerik */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <div key={index} className="bg-background p-6 rounded-xl border space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                  {section.icon}
                </div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <p className="text-muted-foreground">{section.content}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold mb-6">Detaylı Bilgilendirme</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">1. Toplanan Veriler</h3>
            <p className="text-muted-foreground mb-4">
              Platformumuzda aşağıdaki veriler toplanmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Ad, soyad ve iletişim bilgileri</li>
              <li>Eğitim geçmişi ve tercihler</li>
              <li>Platform kullanım verileri</li>
              <li>Ödeme bilgileri</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">2. Veri İşleme Amaçları</h3>
            <p className="text-muted-foreground mb-4">
              Toplanan veriler aşağıdaki amaçlarla işlenmektedir:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Eğitim hizmetlerinin kişiselleştirilmesi</li>
              <li>Platform performansının iyileştirilmesi</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>Kullanıcı deneyiminin geliştirilmesi</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">3. Veri Saklama Süresi</h3>
            <p className="text-muted-foreground mb-4">
              Kişisel verileriniz, hizmet ilişkimiz devam ettiği sürece ve yasal saklama süreleri boyunca güvenli bir şekilde saklanacaktır. Bu sürelerin sona ermesi halinde, verileriniz silinecek, yok edilecek veya anonim hale getirilecektir.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">4. Veri Güvenliği Önlemleri</h3>
            <p className="text-muted-foreground mb-4">
              Verilerinizin güvenliği için aşağıdaki önlemler alınmaktadır:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>SSL şifreleme</li>
              <li>Düzenli güvenlik denetimleri</li>
              <li>Erişim kontrolü ve yetkilendirme</li>
              <li>Veri yedekleme ve kurtarma prosedürleri</li>
            </ul>
          </div>

          <div className="mt-16 p-6 bg-accent/50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">İletişim</h2>
            <p className="text-muted-foreground">
              Gizlilik politikamız hakkında sorularınız veya endişeleriniz varsa, lütfen bizimle iletişime geçin:
            </p>
            <p className="mt-2">
              <strong>E-posta:</strong>{" "}
              <a href="mailto:privacy@matematikkebapcisi.com" className="text-primary hover:underline">
                privacy@matematikkebapcisi.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 