'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Image as ImageIcon, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface KursForm {
  baslik: string;
  aciklama: string;
  fiyat: string;
  resimUrl: string;
}

export default function EditCoursePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState<KursForm>({
    baslik: '',
    aciklama: '',
    fiyat: '',
    resimUrl: '',
  });

  useEffect(() => {
    // Kullanıcı kontrolü
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!user || !token) {
      router.push('/giris');
      return;
    }

    const userObj = JSON.parse(user);
    if (userObj.rol !== 'TEACHER') {
      router.push('/');
      return;
    }

    loadCourse();
  }, []);

  const loadCourse = async () => {
    try {
      const response = await fetch(`/api/egitmen/kurslar/${params.id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Kurs bilgileri alınamadı');
      }

      const data = await response.json();
      setFormData({
        baslik: data.baslik,
        aciklama: data.aciklama,
        fiyat: data.fiyat.toString(),
        resimUrl: data.resimUrl || '',
      });

      if (data.resimUrl) {
        setPreviewImage(data.resimUrl);
      }
    } catch (error) {
      console.error('Kurs yükleme hatası:', error);
      setError('Kurs bilgileri yüklenirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Önizleme için
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Resmi yükle
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
          throw new Error('Resim yüklenemedi');
        }

        const data = await response.json();
        setFormData(prev => ({ ...prev, resimUrl: data.url }));
      } catch (error) {
        console.error('Resim yükleme hatası:', error);
        alert('Resim yüklenirken bir hata oluştu');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      const response = await fetch(`/api/egitmen/kurslar/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          fiyat: parseFloat(formData.fiyat),
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Kurs güncellenirken bir hata oluştu');
      }

      alert('Kurs başarıyla güncellendi');
      router.push('/egitmen');
    } catch (error) {
      console.error('Kurs güncelleme hatası:', error);
      setError(error instanceof Error ? error.message : 'Kurs güncellenirken bir hata oluştu');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bu kursu silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`/api/egitmen/kurslar?id=${params.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Kurs silinirken bir hata oluştu');
      }

      alert('Kurs başarıyla silindi');
      router.push('/egitmen');
    } catch (error) {
      console.error('Kurs silme hatası:', error);
      alert(error instanceof Error ? error.message : 'Kurs silinirken bir hata oluştu');
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
      <div className="container max-w-4xl">
        <div className="bg-background rounded-xl border p-8 shadow-sm">
          {/* Geri Dön */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/egitmen"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Panele Dön
            </Link>

            <button
              onClick={handleDelete}
              className="inline-flex items-center px-4 py-2 text-sm border border-destructive text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Kursu Sil
            </button>
          </div>

          {/* Başlık */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Kursu Düzenle</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Kurs bilgilerini güncellemek için aşağıdaki formu kullanın
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}

            {/* Kurs Resmi */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Kurs Resmi
              </label>
              <div className="flex items-center space-x-4">
                <div className="relative w-40 h-24 rounded-lg border overflow-hidden">
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt="Kurs resmi önizleme"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <label className="flex items-center px-4 py-2 border rounded-lg hover:bg-accent cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  Resim Seç
                </label>
              </div>
            </div>

            {/* Başlık */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Kurs Başlığı <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={formData.baslik}
                onChange={(e) => setFormData({ ...formData, baslik: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={saving}
              />
            </div>

            {/* Açıklama */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Açıklama <span className="text-destructive">*</span>
              </label>
              <textarea
                value={formData.aciklama}
                onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                required
                disabled={saving}
              />
            </div>

            {/* Fiyat */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Fiyat (₺) <span className="text-destructive">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.fiyat}
                onChange={(e) => setFormData({ ...formData, fiyat: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                required
                disabled={saving}
              />
            </div>

            {/* Buton */}
            <button
              type="submit"
              className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={saving}
            >
              {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 