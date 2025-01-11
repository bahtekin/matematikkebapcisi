'use client';

import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, Clock, Users, CheckCircle, BookOpen, Award, ChevronDown, ChevronRight, PlayCircle, Lock, ArrowRight, Play } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { use } from 'react'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'

interface Props {
  params: Promise<{
    slug: string
  }>
}

interface KursWithRelations {
  id: number;
  baslik: string;
  slug: string;
  aciklama: string;
  fiyat: number;
  resimUrl: string | null;
  tag: string | null;
  duration: string | null;
  rating: number;
  olusturuldu: string;
  guncellendi: string;
  kayitliMi: boolean;
  kategori: {
    id: number;
    isim: string;
  };
  ogretmen: {
    ad: string;
    soyad: string;
    biyografi: string | null;
    resimUrl: string | null;
  };
  dersler: Array<{
    id: number;
    baslik: string;
    sure: number;
  }>;
  _count: {
    kayitlar: number;
    dersler: number;
  };
  whatYouWillLearn: string[];
  requirements: string[];
  curriculum: Array<{
    title: string;
    items: Array<{
      title: string;
      duration: string;
    }>;
  }>;
  videoUrl: string | null;
  kaynaklar: Array<{ baslik: string; url: string }>;
}

// YouTube video ID'sini çıkaran yardımcı fonksiyon
function getYouTubeVideoId(url: string): string | null {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
  return match ? match[1] : null;
}

// Toplam video süresini hesaplayan fonksiyon
function calculateTotalDuration(curriculum: Array<{ title: string; items: Array<{ hours: string; minutes: string }> }>) {
  let totalHours = 0;
  let totalMinutes = 0;

  curriculum?.forEach(section => {
    section.items?.forEach(item => {
      totalHours += parseInt(item.hours || '0');
      totalMinutes += parseInt(item.minutes || '0');
    });
  });

  // Dakikaları saate çevir
  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes = totalMinutes % 60;

  return { hours: totalHours, minutes: totalMinutes };
}

export default function KursDetay({ params }: Props) {
  const resolvedParams = use(params)
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'info' | 'curriculum' | 'reviews' | 'announcements'>('info')
  const [kurs, setKurs] = useState<KursWithRelations | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set([0]))
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [progress, setProgress] = useState(0)
  const [buttonLoading, setButtonLoading] = useState(false)

  const fetchKurs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/kurslar/${resolvedParams.slug}`, {
        headers: token ? {
          'Authorization': `Bearer ${token}`
        } : {}
      });
      if (!response.ok) {
        if (response.status === 404) {
          notFound()
        }
        throw new Error('Kurs bilgileri alınamadı')
      }
      const data = await response.json()
      setKurs(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`/api/kurslar/${resolvedParams.slug}/ilerleme`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('İlerleme bilgisi alınamadı');
      
      const data = await response.json();
      setProgress(data.ilerlemeYuzdesi);
    } catch (error) {
      console.error('İlerleme bilgisi alma hatası:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    fetchKurs()
    if (token) {
      fetchProgress()
    }
  }, [resolvedParams.slug])

  const handleKursKayit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      setButtonLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        router.push(`/giris?returnUrl=/kurslar/${resolvedParams.slug}`);
        return;
      }

      // Eğer kursa kayıtlıysa direkt içerik sayfasına yönlendir
      if (kurs?.kayitliMi) {
        router.push(`/kurslar/${resolvedParams.slug}/icerik`);
        return;
      }

      const res = await fetch('/api/kurslar/kayit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          kursId: kurs?.id
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Kursa kayıt olurken bir hata oluştu');
      }

      // Kayıt başarılı, içerik sayfasına yönlendir
      router.push(`/kurslar/${resolvedParams.slug}/icerik`);
      
    } catch (error: any) {
      setError(error.message);
      console.error('Kayıt hatası:', error);
    } finally {
      setButtonLoading(false);
    }
  };

  const breadcrumbItems = [
    {
      label: "Kurslar",
      href: "/kurslar"
    },
    {
      label: kurs?.baslik || "Kurs Detayı"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-red-500 dark:text-red-400">{error}</div>
      </div>
    )
  }

  if (!kurs) return null

  const renderTabContent = () => {
    switch (activeTab) {
      case 'info':
        return (
          <div className="space-y-8">
            {/* Neler Öğreneceksiniz */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Neler Öğreneceksiniz?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(kurs.whatYouWillLearn as string[])?.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eğitmen Hakkında */}
            <div>
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Eğitmen</h2>
              <div className="flex items-start gap-4">
                <Image
                  src={kurs.ogretmen.resimUrl || '/placeholder.png'}
                  alt={`${kurs.ogretmen.ad} ${kurs.ogretmen.soyad}`}
                  width={80}
                  height={80}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-medium text-lg mb-2 text-gray-900 dark:text-gray-100">
                    {kurs.ogretmen.ad} {kurs.ogretmen.soyad}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {kurs.ogretmen.biyografi}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'curriculum':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Ders İçeriği</h2>
            {(kurs.curriculum as any[])?.map((section, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => {
                    const newExpandedSections = new Set(expandedSections)
                    if (newExpandedSections.has(index)) {
                      newExpandedSections.delete(index)
                    } else {
                      newExpandedSections.add(index)
                    }
                    setExpandedSections(newExpandedSections)
                  }}
                  className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {expandedSections.has(index) ? (
                      <ChevronDown className="w-5 h-5 text-primary" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-primary" />
                    )}
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">{section.title}</h3>
                  </div>
                </button>
                
                {expandedSections.has(index) && (
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {section.items.map((item: any, itemIndex: number) => (
                      <div 
                        key={itemIndex} 
                        className={`p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 ${!isLoggedIn ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => {
                          if (!isLoggedIn) {
                            router.push(`/giris?returnUrl=/kurslar/${resolvedParams.slug}/icerik?video=${item.id}`);
                            return;
                          }

                          if (!kurs.kayitliMi) {
                            // Kursa kayıt olmadan önce onay al
                            if (window.confirm('Bu dersi izlemek için kursa kayıt olmanız gerekmektedir. Kayıt sayfasına yönlendirilmek ister misiniz?')) {
                              handleKursKayit(new MouseEvent('click') as React.MouseEvent);
                            }
                            return;
                          }

                          // Giriş yapılmış ve kursa kayıtlıysa direkt video sayfasına git
                          router.push(`/kurslar/${resolvedParams.slug}/icerik?video=${item.id}`);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <PlayCircle className={`w-5 h-5 ${isLoggedIn ? 'text-primary' : 'text-gray-400'}`} />
                          </div>
                          <span className="text-gray-600 dark:text-gray-400 font-medium">{item.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {item.hours}sa {item.minutes}dk
                          </span>
                          {!isLoggedIn && (
                            <Lock className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )

      case 'reviews':
        return (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Henüz değerlendirme yapılmamış.
          </div>
        )

      case 'announcements':
        return (
          <div className="text-center py-12 text-gray-600 dark:text-gray-400">
            Henüz duyuru yapılmamış.
          </div>
        )
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb 
          items={breadcrumbItems} 
          title={kurs.baslik}
          description={kurs.aciklama}
          instructor={{
            name: `${kurs.ogretmen.ad} ${kurs.ogretmen.soyad}`,
            avatar: kurs.ogretmen.resimUrl
          }}
          stats={[
            {
              icon: <Star className="w-5 h-5 text-yellow-400" />,
              label: `${kurs.rating}`
            },
            {
              icon: <Users className="w-5 h-5 text-primary" />,
              label: `${kurs._count.kayitlar} öğrenci`
            },
            {
              icon: <Clock className="w-5 h-5 text-primary" />,
              label: (() => {
                const { hours, minutes } = calculateTotalDuration(kurs.curriculum);
                return `${hours} saat ${minutes} dakika`;
              })()
            }
          ]}
        />
        
        {/* Kurs Detay İçeriği */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Sol Kolon - Video ve Sekmeler */}
          <div className="lg:col-span-2">
            {/* Video Önizleme */}
            {kurs.videoUrl && (
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <div className="absolute inset-0">
                  <Plyr
                    source={{
                      type: 'video',
                      sources: [
                        {
                          src: getYouTubeVideoId(kurs.videoUrl) || '',
                          provider: 'youtube'
                        }
                      ]
                    }}
                    options={{
                      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'],
                      youtube: { noCookie: false, rel: 0, showinfo: 0, iv_load_policy: 3, modestbranding: 1 }
                    }}
                  />
                </div>
              </div>
            )}

            {/* Sekmeli İçerik */}
            <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
              <nav className="flex gap-8">
                <button 
                  onClick={() => setActiveTab('info')}
                  className={`px-1 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'info' 
                      ? 'text-primary border-primary' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Kurs Bilgileri
                </button>
                <button 
                  onClick={() => setActiveTab('curriculum')}
                  className={`px-1 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'curriculum' 
                      ? 'text-primary border-primary' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Ders İçeriği
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`px-1 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'reviews' 
                      ? 'text-primary border-primary' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Değerlendirmeler
                </button>
                <button 
                  onClick={() => setActiveTab('announcements')}
                  className={`px-1 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === 'announcements' 
                      ? 'text-primary border-primary' 
                      : 'text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Duyurular
                </button>
              </nav>
            </div>

            {/* Sekme İçeriği */}
            {renderTabContent()}
          </div>

          {/* Sağ Kolon - Kurs Detayları */}
          <div>
            <div className="sticky top-8 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 space-y-6 shadow-lg">
                <div className="flex items-center justify-between">
                  {kurs.kayitliMi ? (
                    <div className="w-full">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">İlerlemeniz</span>
                        <span className="text-sm font-medium text-primary">0%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold">₺{kurs.fiyat}</span>
                  )}
                </div>

                <button 
                  onClick={handleKursKayit}
                  disabled={buttonLoading}
                  className="block w-full py-3 px-4 text-center font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors disabled:opacity-50"
                >
                  {buttonLoading ? 'İşlem yapılıyor...' : kurs.kayitliMi ? 'Devam Et' : 'Kursa Katıl'}
                </button>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">Kurs İçeriği</h3>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    {kurs.curriculum && kurs.curriculum.length > 0 && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {(() => {
                          const { hours, minutes } = calculateTotalDuration(kurs.curriculum);
                          return `${hours} saat ${minutes} dakika video içeriği`;
                        })()}
                      </li>
                    )}
                    {kurs.kaynaklar && kurs.kaynaklar.length > 0 && (
                      <li className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-primary" />
                        {kurs.kaynaklar.length} indirilebilir kaynak
                      </li>
                    )}
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Ömür boyu erişim
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Mobil ve TV'de erişim
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Tamamlama sertifikası
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Gereksinimler</h3>
                  <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {(kurs.requirements as string[])?.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Kaynaklar</h3>
                  <ul className="space-y-2">
                    {(kurs.kaynaklar as Array<{ baslik: string; url: string }>)?.map((kaynak, index) => (
                      <li key={index}>
                        <a href={kaynak.url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                          {kaynak.baslik}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobil için yapışkan buton */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 border-t shadow-lg z-50">
        <button
          onClick={handleKursKayit}
          disabled={buttonLoading}
          className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {buttonLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : kurs.kayitliMi ? (
            <>
              <Play className="w-4 h-4" />
              Kursa Devam Et
            </>
          ) : (
            <>
              <BookOpen className="w-4 h-4" />
              {kurs.fiyat === 0 ? 'Ücretsiz Katıl' : `₺${kurs.fiyat} - Kursa Katıl`}
            </>
          )}
        </button>
      </div>
    </main>
  )
}
