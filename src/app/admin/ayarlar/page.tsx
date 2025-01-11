'use client';

import { useState, useEffect } from 'react';
import { Save, Settings, Globe, Mail, Phone, Share2, Server } from 'lucide-react';
import clsx from 'clsx';

type SettingsSection = 'genel' | 'iletisim' | 'sosyalMedya' | 'smtp';

export default function AyarlarPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('genel');
  const [settings, setSettings] = useState({
    siteName: 'Matematik Kebapcisi',
    siteDescription: 'Online matematik eğitim platformu',
    contactEmail: 'info@matematikkebapcisi.com',
    phoneNumber: '',
    address: '',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      youtube: '',
    },
    smtp: {
      host: '',
      port: '',
      user: '',
      password: '',
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/ayarlar', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Ayarlar getirilirken bir hata oluştu');
      }

      const data = await response.json();
      if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Ayarlar getirilirken hata:', error);
      setError('Ayarlar getirilirken bir hata oluştu');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/ayarlar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error('Ayarlar kaydedilirken bir hata oluştu');
      }

      alert('Ayarlar başarıyla kaydedildi');
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error);
      setError('Ayarlar kaydedilirken bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: 'genel', icon: Globe, label: 'Genel Ayarlar' },
    { id: 'iletisim', icon: Phone, label: 'İletişim Bilgileri' },
    { id: 'sosyalMedya', icon: Share2, label: 'Sosyal Medya' },
    { id: 'smtp', icon: Server, label: 'SMTP Ayarları' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'genel':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Genel Ayarlar</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Site Adı</label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Site Açıklaması</label>
                <input
                  type="text"
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        );

      case 'iletisim':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">İletişim Bilgileri</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">E-posta</label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Telefon</label>
                <input
                  type="tel"
                  value={settings.phoneNumber}
                  onChange={(e) => setSettings({...settings, phoneNumber: e.target.value})}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Adres</label>
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({...settings, address: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        );

      case 'sosyalMedya':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">Sosyal Medya</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Facebook</label>
                <input
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: {...settings.socialMedia, facebook: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://facebook.com/..."
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Twitter</label>
                <input
                  type="url"
                  value={settings.socialMedia.twitter}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: {...settings.socialMedia, twitter: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://twitter.com/..."
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Instagram</label>
                <input
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: {...settings.socialMedia, instagram: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://instagram.com/..."
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">YouTube</label>
                <input
                  type="url"
                  value={settings.socialMedia.youtube}
                  onChange={(e) => setSettings({
                    ...settings,
                    socialMedia: {...settings.socialMedia, youtube: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="https://youtube.com/..."
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        );

      case 'smtp':
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-medium">SMTP Ayarları</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">SMTP Sunucu</label>
                <input
                  type="text"
                  value={settings.smtp.host}
                  onChange={(e) => setSettings({
                    ...settings,
                    smtp: {...settings.smtp, host: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="smtp.example.com"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">SMTP Port</label>
                <input
                  type="text"
                  value={settings.smtp.port}
                  onChange={(e) => setSettings({
                    ...settings,
                    smtp: {...settings.smtp, port: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="587"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">SMTP Kullanıcı Adı</label>
                <input
                  type="text"
                  value={settings.smtp.user}
                  onChange={(e) => setSettings({
                    ...settings,
                    smtp: {...settings.smtp, user: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">SMTP Şifre</label>
                <input
                  type="password"
                  value={settings.smtp.password}
                  onChange={(e) => setSettings({
                    ...settings,
                    smtp: {...settings.smtp, password: e.target.value}
                  })}
                  className="w-full px-3 py-2 border rounded-md"
                  disabled={loading}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Site Ayarları</h1>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Kaydediliyor...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
          {error}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {/* Sol Menü */}
        <div className="col-span-3 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as SettingsSection)}
                  className={clsx(
                    'w-full flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-md',
                    activeSection === item.id
                      ? 'bg-primary text-white'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sağ İçerik */}
        <div className="col-span-9 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 