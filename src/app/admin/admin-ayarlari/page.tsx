'use client'

import { useState, useEffect } from 'react'
import { User, Lock, Trash2, Plus, X, AlertTriangle } from 'lucide-react'
import { toast } from 'react-hot-toast'

export default function AdminAyarlari() {
  const [adminler, setAdminler] = useState([])
  const [yeniAdmin, setYeniAdmin] = useState({ email: '', sifre: '' })
  const [yukleniyor, setYukleniyor] = useState(false)
  const [sifreDegistirmeModal, setSifreDegistirmeModal] = useState(false)
  const [seciliAdmin, setSeciliAdmin] = useState<any>(null)
  const [yeniSifre, setYeniSifre] = useState('')
  const [silmeModal, setSilmeModal] = useState(false)
  const [silinecekAdmin, setSilinecekAdmin] = useState<any>(null)

  // Adminleri getir
  const adminleriGetir = async () => {
    try {
      const res = await fetch('/api/admin/yonetim')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setAdminler(data)
    } catch (error) {
      console.error('Adminler getirilirken hata:', error)
      toast.error('Adminler yüklenirken bir hata oluştu.')
    }
  }

  useEffect(() => {
    adminleriGetir()
  }, [])

  const adminEkle = async (e: React.FormEvent) => {
    e.preventDefault()
    setYukleniyor(true)

    try {
      const res = await fetch('/api/admin/yonetim', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(yeniAdmin),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error)
      }

      toast.success('Admin başarıyla eklendi!')
      setYeniAdmin({ email: '', sifre: '' })
      adminleriGetir() // Listeyi güncelle
    } catch (error: any) {
      console.error('Admin eklenirken hata:', error)
      toast.error(error.message || 'Admin eklenirken bir hata oluştu.')
    } finally {
      setYukleniyor(false)
    }
  }

  const adminSilmeOnay = async (admin: any) => {
    setSilinecekAdmin(admin)
    setSilmeModal(true)
  }

  const adminSil = async () => {
    setYukleniyor(true)

    try {
      const res = await fetch('/api/admin/yonetim', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId: silinecekAdmin.id,
        }),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error)
      }

      toast.success('Admin başarıyla silindi!')
      setSilmeModal(false)
      setSilinecekAdmin(null)
      adminleriGetir() // Listeyi güncelle
    } catch (error: any) {
      console.error('Admin silme hatası:', error)
      toast.error(error.message || 'Admin silinirken bir hata oluştu.')
    } finally {
      setYukleniyor(false)
    }
  }

  const sifreDegistir = async (admin: any) => {
    setSeciliAdmin(admin)
    setSifreDegistirmeModal(true)
  }

  const sifreDegistirmeIslemi = async (e: React.FormEvent) => {
    e.preventDefault()
    setYukleniyor(true)

    try {
      const res = await fetch('/api/admin/yonetim', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          adminId: seciliAdmin.id,
          yeniSifre,
        }),
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error)
      }

      toast.success('Şifre başarıyla değiştirildi!')
      setSifreDegistirmeModal(false)
      setYeniSifre('')
      setSeciliAdmin(null)
    } catch (error: any) {
      console.error('Şifre değiştirme hatası:', error)
      toast.error(error.message || 'Şifre değiştirilirken bir hata oluştu.')
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Ayarları</h1>
      </div>

      {/* Yeni Admin Ekleme Formu */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Yeni Admin Ekle</h2>
        <form onSubmit={adminEkle} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              value={yeniAdmin.email}
              onChange={(e) => setYeniAdmin({ ...yeniAdmin, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              required
              disabled={yukleniyor}
            />
          </div>
          <div>
            <label htmlFor="sifre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Şifre
            </label>
            <input
              type="password"
              id="sifre"
              value={yeniAdmin.sifre}
              onChange={(e) => setYeniAdmin({ ...yeniAdmin, sifre: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
              required
              disabled={yukleniyor}
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={yukleniyor}
          >
            <Plus className="h-4 w-4 mr-2" />
            {yukleniyor ? 'Ekleniyor...' : 'Admin Ekle'}
          </button>
        </form>
      </div>

      {/* Admin Listesi */}
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Mevcut Adminler</h2>
        <div className="space-y-4">
          {adminler.map((admin: any) => (
            <div key={admin.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <span className="text-gray-900 dark:text-white block">{admin.email}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(admin.olusturuldu).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => sifreDegistir(admin)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                >
                  <Lock className="h-4 w-4 mr-1" />
                  Şifre Değiştir
                </button>
                <button
                  onClick={() => adminSilmeOnay(admin)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Sil
                </button>
              </div>
            </div>
          ))}
          {adminler.length === 0 && (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
              Henüz hiç admin bulunmuyor.
            </div>
          )}
        </div>
      </div>

      {/* Şifre Değiştirme Modalı */}
      {sifreDegistirmeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Şifre Değiştir
              </h3>
              <button
                onClick={() => {
                  setSifreDegistirmeModal(false)
                  setYeniSifre('')
                  setSeciliAdmin(null)
                }}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={sifreDegistirmeIslemi} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Admin E-posta
                </label>
                <input
                  type="text"
                  value={seciliAdmin?.email}
                  disabled
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="yeniSifre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Yeni Şifre
                </label>
                <input
                  type="password"
                  id="yeniSifre"
                  value={yeniSifre}
                  onChange={(e) => setYeniSifre(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                  required
                  disabled={yukleniyor}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setSifreDegistirmeModal(false)
                    setYeniSifre('')
                    setSeciliAdmin(null)
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md"
                  disabled={yukleniyor}
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={yukleniyor}
                >
                  {yukleniyor ? 'Değiştiriliyor...' : 'Şifreyi Değiştir'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Silme Onay Modalı */}
      {silmeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-center mb-4 text-yellow-500">
              <AlertTriangle className="h-12 w-12" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white text-center mb-2">
              Admin Silme Onayı
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
              <span className="font-medium text-gray-900 dark:text-white">{silinecekAdmin?.email}</span> adlı admini silmek istediğinize emin misiniz?
            </p>
            <div className="flex justify-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  setSilmeModal(false)
                  setSilinecekAdmin(null)
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md"
                disabled={yukleniyor}
              >
                İptal
              </button>
              <button
                onClick={adminSil}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={yukleniyor}
              >
                {yukleniyor ? 'Siliniyor...' : 'Evet, Sil'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 