'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Camera, Mail, Phone, School, Target, User, Lock, Edit2, Check, X } from 'lucide-react';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState('/default-avatar.png');
  const [formData, setFormData] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet@example.com',
    phone: '0555 123 45 67',
    grade: '12. Sınıf',
    examType: 'TYT ve AYT',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Profil güncelleme işlemleri burada yapılacak
    console.log(formData);
  };

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
                <h2 className="text-xl font-bold">{formData.name}</h2>
                <p className="text-sm text-muted-foreground mt-1">{formData.grade} Öğrencisi</p>
              </div>

              {/* Hızlı Bilgiler */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-center text-sm">
                  <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                  <span>{formData.phone}</span>
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
          <div className="lg:col-span-2">
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
          </div>
        </div>
      </div>
    </main>
  );
} 