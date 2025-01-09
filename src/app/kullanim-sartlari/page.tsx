import { Scale, UserCheck, CreditCard, AlertCircle } from 'lucide-react';

const sections = [
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Genel Hükümler",
    content: "Bu kullanım şartları, platformumuzun kullanımına ilişkin hak ve yükümlülükleri belirler. Platformu kullanarak bu şartları kabul etmiş sayılırsınız."
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    title: "Üyelik",
    content: "Platform üyeliği kişiseldir ve devredilemez. Üyelik bilgilerinizin güvenliğinden siz sorumlusunuz."
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Ödeme ve İadeler",
    content: "Ödeme işlemleri güvenli ödeme sistemleri üzerinden gerçekleştirilir. İade politikamız yasal mevzuata uygundur."
  },
  {
    icon: <AlertCircle className="w-6 h-6" />,
    title: "Sorumluluklar",
    content: "Platform içeriğinin telif hakları bize aittir. İçeriklerin izinsiz kullanımı ve paylaşımı yasaktır."
  }
];

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-accent/50">
        <div className="container px-4 md:px-6 py-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              Kullanım Şartları
            </h1>
            <p className="text-lg text-muted-foreground">
              Platformumuzu kullanırken uymanız gereken kurallar ve bilmeniz gerekenler
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
            <h2 className="text-2xl font-bold mb-6">Detaylı Şartlar</h2>
            
            <h3 className="text-xl font-semibold mt-8 mb-4">1. Hizmet Kullanımı</h3>
            <p className="text-muted-foreground mb-4">
              Platform üzerinden sunulan hizmetleri kullanırken:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Yasalara ve etik kurallara uygun davranmalısınız</li>
              <li>Başkalarının haklarına saygı göstermelisiniz</li>
              <li>Platform güvenliğini tehlikeye atmamalısınız</li>
              <li>İçerikleri izinsiz paylaşmamalısınız</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">2. Üyelik Kuralları</h3>
            <p className="text-muted-foreground mb-4">
              Üyelik sürecinde ve sonrasında:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Doğru ve güncel bilgiler vermelisiniz</li>
              <li>Hesap güvenliğinizi sağlamalısınız</li>
              <li>Başkalarının hesaplarını kullanmamalısınız</li>
              <li>Hesap bilgilerinizi paylaşmamalısınız</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">3. Ödeme ve İade Koşulları</h3>
            <p className="text-muted-foreground mb-4">
              Satın alma ve iade süreçlerinde:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Ödemeler güvenli sistemler üzerinden yapılır</li>
              <li>İadeler 14 gün içinde değerlendirilir</li>
              <li>Kullanılmış içerikler iade kapsamı dışındadır</li>
              <li>İade talepleri gerekçeli olmalıdır</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">4. İçerik Kullanımı</h3>
            <p className="text-muted-foreground mb-4">
              Platform içeriklerinin kullanımında:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Telif haklarına uymalısınız</li>
              <li>İçerikleri kişisel kullanımla sınırlamalısınız</li>
              <li>Ticari amaçla kullanmamalısınız</li>
              <li>İzinsiz çoğaltma ve dağıtım yapmamalısınız</li>
            </ul>
          </div>

          <div className="mt-16 p-6 bg-accent/50 rounded-xl">
            <h2 className="text-xl font-semibold mb-4">Güncellemeler</h2>
            <p className="text-muted-foreground">
              Bu kullanım şartları periyodik olarak güncellenebilir. Önemli değişiklikler olduğunda size bildirim yapılacaktır. Platformu kullanmaya devam ederek güncel şartları kabul etmiş sayılırsınız.
            </p>
            <p className="mt-4">
              <strong>Son güncelleme:</strong> 1 Mart 2024
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 