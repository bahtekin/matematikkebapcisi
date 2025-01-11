import Image from 'next/image';
import Link from 'next/link';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="relative">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Sol taraf - Deneyim ve Resim */}
          <div className="relative flex-1">
            {/* Deneyim kutusu */}
            <div className="absolute -left-4 top-4 bg-blue-600 text-white rounded-lg p-4 z-10">
              <div className="text-3xl font-bold">12 +</div>
              <div className="text-sm">Yıllık Deneyim</div>
            </div>

            {/* Ana resim */}
            <div className="relative z-0 rounded-lg overflow-hidden shadow-xl bg-white">
              <Image
                src="/instructor-1.jpg"
                alt="Eğitmen"
                width={600}
                height={400}
                className="object-cover w-full h-full"
                quality={100}
              />
            </div>
          </div>

          {/* Sağ taraf - İçerik */}
          <div className="flex-1 space-y-6">
            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-lg">
              Bizi Tanıyın
            </div>

            <h2 className="text-4xl font-bold">
              Alanında Uzmanlaşmış En İyi <span className="text-blue-600">Eğitmenler</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-400">
              Matematik eğitiminde uzmanlaşmış, deneyimli kadromuzla öğrencilerimize en iyi eğitimi sunuyoruz. 
              Her seviyede öğrenciye uygun, kişiselleştirilmiş eğitim programlarımızla başarıya ulaşmanızı sağlıyoruz.
            </p>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-8">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Image
                    src="/icons/teacher.png"
                    alt="Eğitmen"
                    width={48}
                    height={48}
                    className="text-blue-600"
                    quality={100}
                  />
                </div>
                <div className="text-2xl font-bold">20000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uzman Eğitmen</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Image
                    src="/icons/lesson.png"
                    alt="Ders"
                    width={48}
                    height={48}
                    className="text-blue-600"
                    quality={100}
                  />
                </div>
                <div className="text-2xl font-bold">1500</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Üst Düzey Ders</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Image
                    src="/icons/student.png"
                    alt="Öğrenci"
                    width={48}
                    height={48}
                    className="text-blue-600"
                    quality={100}
                  />
                </div>
                <div className="text-2xl font-bold">18000</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Aktif Öğrenci</div>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Image
                    src="/icons/video.png"
                    alt="Video"
                    width={48}
                    height={48}
                    className="text-blue-600"
                    quality={100}
                  />
                </div>
                <div className="text-2xl font-bold">3200</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Video Ders</div>
              </div>
            </div>

            <Link
              href="/kurslar"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              DAHA FAZLASINI KEŞFEDİN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 