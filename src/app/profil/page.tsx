'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Mail, Phone, School, Target, User, Lock, Edit2, Check, X, Clock, BookOpen, Play } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: number;
  ad: string;
  soyad: string;
  email: string;
  telefon: string;
  resimUrl: string | null;
  biyografi: string;
  rol: string;
}

interface KayitliKurs {
  id: number;
  olusturuldu: string;
  durum: string;
  kurs: {
    id: number;
    baslik: string;
    slug: string;
    resimUrl: string | null;
    duration: string | null;
    _count: {
      dersler: number;
    };
    ogretmen: {
      ad: string;
      soyad: string;
    };
  };
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [profileImage, setProfileImage] = useState('/default-avatar.png');
  const [kayitliKurslar, setKayitliKurslar] = useState<KayitliKurs[]>([]);
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    email: '',
    telefon: '',
    grade: '',
    examType: '',
  });

  useEffect(() => {
    // Kullanıcı giriş yapmış mı kontrol et
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!user || !token) {
      router.push('/giris');
      return;
    }

    // Kullanıcı bilgilerini yükle
    const userObj = JSON.parse(user);
    loadUserProfile(userObj.id);
    loadKayitliKurslar();
  }, [router]);

  const loadUserProfile = async (userId: number) => {
    try {
      const response = await fetch(`/api/profil/${userId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 401 || response.status === 403) {
        // Token geçersiz veya yetkisiz erişim durumunda
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/giris');
        return;
      }

      if (!response.ok) {
        throw new Error('Profil bilgileri alınamadı');
      }

      const data = await response.json();
      
      // Biyografi bilgilerini parse et
      let grade = '';
      let examType = '';
      try {
        const bio = JSON.parse(data.biyografi);
        grade = bio.grade;
        examType = bio.examType;
      } catch (e) {
        console.error('Biyografi parse hatası:', e);
      }

      setFormData({
        ad: data.ad,
        soyad: data.soyad,
        email: data.email,
        telefon: data.telefon || '',
        grade,
        examType,
      });

      if (data.resimUrl) {
        setProfileImage(data.resimUrl);
      }
    } catch (error) {
      setError('Profil bilgileri yüklenirken bir hata oluştu');
      console.error('Profil yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadKayitliKurslar = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('/api/profil/kurslar', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Kayıtlı kurslar yüklenemedi');
      }

      const data = await response.json();
      setKayitliKurslar(data);
    } catch (error) {
      console.error('Kayıtlı kurslar yükleme hatası:', error);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Resim yüklenemedi');
        }

        const data = await response.json();
        
        // Profil resmini güncelle
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const updateResponse = await fetch(`/api/profil/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            ...formData,
            resimUrl: data.url
          })
        });

        if (!updateResponse.ok) {
          throw new Error('Profil resmi güncellenemedi');
        }

        setProfileImage(data.url);
        alert('Profil resmi başarıyla güncellendi');
        
        // Sayfayı yenile
        window.location.reload();
      } catch (error) {
        console.error('Resim yükleme hatası:', error);
        alert(error instanceof Error ? error.message : 'Resim yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Biyografi bilgilerini oluştur
      const biyografi = JSON.stringify({
        grade: formData.grade,
        examType: formData.examType
      });

      const response = await fetch(`/api/profil/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ad: formData.ad,
          soyad: formData.soyad,
          email: formData.email,
          telefon: formData.telefon,
          biyografi,
          resimUrl: profileImage === '/default-avatar.png' ? null : profileImage
        })
      });

      if (!response.ok) {
        throw new Error('Profil güncellenemedi');
      }

      // Kullanıcı bilgilerini localStorage'da güncelle
      const updatedUser = {
        ...user,
        ad: formData.ad,
        soyad: formData.soyad,
        email: formData.email
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setIsEditing(false);
      alert('Profil başarıyla güncellendi');
      
      // Sayfayı yenile
      window.location.reload();
    } catch (error) {
      console.error('Güncelleme hatası:', error);
      setError('Profil güncellenirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-grid-pattern py-8">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-background rounded-xl border p-6 shadow-sm space-y-6">
              {/* Profil Resmi */}
              <div className="relative mx-auto w-32 h-32">
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-lg">
                  <Image
                    src={profileImage}
                    alt="Profil Resmi"
                    fill
                    className="object-cover"
                  />
                </div>
                <label className="absolute bottom-0 right-0 p-2 bg-primary text-primary-foreground rounded-full cursor-pointer shadow-lg hover:bg-primary/90 transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>

              {/* Kullanıcı Adı */}
              <div className="text-center">
                <h2 className="text-xl font-bold">{formData.ad} {formData.soyad}</h2>
                <p className="text-sm text-muted-foreground mt-1">{formData.grade ? `${formData.grade}. Sınıf Öğrencisi` : 'Öğrenci'}</p>
              </div>

              {/* Hızlı Bilgiler */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>{formData.telefon}</span>
                </div>
                <div className="flex items-center text-sm">
                  <School className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>{formData.grade}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Target className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>{formData.examType}</span>
                </div>
              </div>

              {/* Şifre Değiştir */}
              <Link
                href="/profil/sifre-degistir"
                className="flex items-center justify-center w-full py-2 mt-4 text-sm border rounded-lg hover:bg-accent transition-colors"
              >
                <Lock className="w-4 h-4 mr-2" />
                Şifre Değiştir
              </Link>
            </div>
          </div>

          {/* Sağ İçerik */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profil Bilgileri */}
            <div className="bg-background rounded-xl border p-6 shadow-sm">
              {/* Başlık */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Profil Bilgileri</h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kişisel bilgilerinizi buradan güncelleyebilirsiniz
                  </p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center px-4 py-2 text-sm border rounded-lg hover:bg-accent transition-colors"
                  >
                    <Edit2 className="w-4 h-4 mr-2" />
                    Düzenle
                  </button>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Ad Soyad */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <User className="w-4 h-4 mr-2 text-muted-foreground" />
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={formData.ad}
                    onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!isEditing}
                  />
                </div>

                {/* E-posta */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-muted-foreground" />
                    E-posta
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!isEditing}
                  />
                </div>

                {/* Telefon */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-muted-foreground" />
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.telefon}
                    onChange={(e) => setFormData({ ...formData, telefon: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!isEditing}
                  />
                </div>

                {/* Sınıf */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <School className="w-4 h-4 mr-2 text-muted-foreground" />
                    Sınıf
                  </label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!isEditing}
                  >
                    <option value="9. Sınıf">9. Sınıf</option>
                    <option value="10. Sınıf">10. Sınıf</option>
                    <option value="11. Sınıf">11. Sınıf</option>
                    <option value="12. Sınıf">12. Sınıf</option>
                    <option value="Mezun">Mezun</option>
                  </select>
                </div>

                {/* Hedef Sınav */}
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Target className="w-4 h-4 mr-2 text-muted-foreground" />
                    Hedef Sınav
                  </label>
                  <select
                    value={formData.examType}
                    onChange={(e) => setFormData({ ...formData, examType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    disabled={!isEditing}
                  >
                    <option value="TYT">TYT</option>
                    <option value="AYT">AYT</option>
                    <option value="TYT ve AYT">TYT ve AYT</option>
                    <option value="LGS">LGS</option>
                  </select>
                </div>

                {/* Butonlar */}
                {isEditing && (
                  <div className="flex items-center space-x-4 pt-4">
                    <button
                      type="submit"
                      className="flex items-center justify-center px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Kaydet
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="flex items-center justify-center px-6 py-2 border rounded-lg hover:bg-accent transition-colors"
                    >
                      <X className="w-4 h-4 mr-2" />
                      İptal
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Kayıtlı Kurslar */}
            <div className="bg-background rounded-xl border p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Kayıtlı Kurslarım</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Kayıt olduğunuz kursları buradan takip edebilirsiniz
                  </p>
                </div>
              </div>

              {kayitliKurslar.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-muted-foreground mb-4">Henüz hiç kursa kayıt olmadınız.</div>
                  <Link 
                    href="/kurslar"
                    className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90"
                  >
                    Kurslara Göz At
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {kayitliKurslar.map((kayit) => (
                    <div key={kayit.id} className="bg-accent/5 rounded-lg border p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="relative w-24 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={kayit.kurs.resimUrl || '/placeholder.png'}
                              alt={kayit.kurs.baslik}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {kayit.kurs.baslik}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {kayit.kurs.ogretmen.ad} {kayit.kurs.ogretmen.soyad}
                            </p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                              <span>{kayit.kurs.duration ? `${kayit.kurs.duration} dakika` : '35 dakika'}</span>
                              <span>{kayit.kurs._count.dersler > 0 ? `${kayit.kurs._count.dersler} ders` : 'Henüz ders yok'}</span>
                            </div>
                          </div>
                        </div>
                        {kayit.durum === 'tamamlandi' ? (
                          <div className="flex items-center gap-2">
                            <div className="text-sm text-muted-foreground">
                              Tamamlandı
                            </div>
                            <Link
                              href={`/kurslar/${kayit.kurs.slug}/icerik`}
                              className="flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                            >
                              Tekrar İzle
                            </Link>
                          </div>
                        ) : (
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex flex-col items-end gap-1">
                              <div className="text-sm text-muted-foreground">
                                Kursa kayıtlısınız
                              </div>
                              <div className="w-[200px] h-2 bg-accent rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all duration-300" 
                                  style={{ 
                                    width: `${Math.round((kayit.tamamlananDersSayisi || 0) / (kayit.kurs._count.dersler || 1) * 100)}%` 
                                  }}
                                />
                              </div>
                              <div className="text-xs text-muted-foreground">
                                %{Math.round((kayit.tamamlananDersSayisi || 0) / (kayit.kurs._count.dersler || 1) * 100)} tamamlandı
                              </div>
                            </div>
                            <Link
                              href={`/kurslar/${kayit.kurs.slug}/icerik`}
                              className="flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
                            >
                              Devam Et
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 