'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, X } from 'lucide-react'
import Image from 'next/image'

// Tip tanımlamaları
interface Kurs {
  id: number
  baslik: string
  slug: string
  aciklama: string
  fiyat: number
  resimUrl?: string | null
  tag?: string | null
  rating: number
  kategoriId: number
  ogretmenId: number
  whatYouWillLearn?: any
  requirements?: any
  curriculum?: any
  videoUrl?: string | null
  kaynaklar?: any
  olusturuldu: Date
  guncellendi: Date
}

interface Kategori {
  id: number
  isim: string
}

interface User {
  id: number
  ad: string
  soyad: string
}

interface CurriculumItem {
  id: number
  title: string
  hours: string
  minutes: string
  videoUrl?: string
  isLocked: boolean
  type?: string
}

interface CurriculumSection {
  id: number
  title: string
  items: CurriculumItem[]
}

interface FormData {
  baslik: string
  aciklama: string
  fiyat: string
  resimUrl: string
  kategoriId: string
  ogretmenId: string
  tag: string
  rating: string
  whatYouWillLearn: string[]
  requirements: string[]
  curriculum: Array<{
    id: number
    title: string
    items: Array<{
      id: number
      title: string
      hours: string
      minutes: string
      isLocked: boolean
      videoUrl?: string
    }>
  }>
  videoUrl: string
  kaynaklar: Array<{
    baslik: string
    url: string
  }>
}

interface KursFormProps {
  kategoriler: Kategori[]
  ogretmenler: User[]
  initialData?: Partial<Kurs>
}

export default function KursForm({ kategoriler, ogretmenler, initialData }: KursFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    baslik: initialData?.baslik || '',
    aciklama: initialData?.aciklama || '',
    fiyat: initialData?.fiyat?.toString() || '',
    resimUrl: initialData?.resimUrl || '',
    kategoriId: initialData?.kategoriId?.toString() || '',
    ogretmenId: initialData?.ogretmenId?.toString() || '',
    tag: initialData?.tag || '',
    rating: initialData?.rating?.toString() || '5.0',
    whatYouWillLearn: initialData?.whatYouWillLearn || [''],
    requirements: initialData?.requirements || [''],
    curriculum: initialData?.curriculum || [
      {
        id: 1,
        title: '',
        items: [
          {
            id: 1,
            title: '',
            hours: '0',
            minutes: '0',
            isLocked: false,
            videoUrl: ''
          }
        ]
      }
    ],
    videoUrl: initialData?.videoUrl || '',
    kaynaklar: initialData?.kaynaklar || []
  })

  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Resim yüklenirken bir hata oluştu')
      }

      const data = await response.json()
      setFormData(prev => ({ ...prev, resimUrl: data.url }))
    } catch (error) {
      console.error('Resim yükleme hatası:', error)
      alert('Resim yüklenirken bir hata oluştu')
    } finally {
      setUploading(false)
    }
  }

  const handleImageRemove = () => {
    setFormData(prev => ({ ...prev, resimUrl: '' }))
  }

  const handleWhatYouWillLearnChange = (index: number, value: string) => {
    const newItems = [...formData.whatYouWillLearn]
    newItems[index] = value
    setFormData({ ...formData, whatYouWillLearn: newItems })
  }

  const addWhatYouWillLearnItem = () => {
    setFormData({
      ...formData,
      whatYouWillLearn: [...formData.whatYouWillLearn, '']
    })
  }

  const removeWhatYouWillLearnItem = (index: number) => {
    const newItems = formData.whatYouWillLearn.filter((_: string, i: number) => i !== index)
    setFormData({ ...formData, whatYouWillLearn: newItems })
  }

  const handleRequirementsChange = (index: number, value: string) => {
    const newItems = [...formData.requirements]
    newItems[index] = value
    setFormData({ ...formData, requirements: newItems })
  }

  const addRequirementItem = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, '']
    })
  }

  const removeRequirementItem = (index: number) => {
    const newItems = formData.requirements.filter((_: string, i: number) => i !== index)
    setFormData({ ...formData, requirements: newItems })
  }

  const handleCurriculumChange = (
    sectionIndex: number,
    itemIndex: number | null,
    field: keyof CurriculumItem | keyof CurriculumSection,
    value: string | boolean
  ) => {
    const newCurriculum = [...formData.curriculum]
    
    if (itemIndex === null) {
      // Section değişikliği
      newCurriculum[sectionIndex] = {
        ...newCurriculum[sectionIndex],
        [field]: value
      }
    } else {
      // Item değişikliği
      newCurriculum[sectionIndex].items[itemIndex] = {
        ...newCurriculum[sectionIndex].items[itemIndex],
        [field]: value
      }
    }
    
    setFormData({ ...formData, curriculum: newCurriculum })
  }

  const addCurriculumSection = () => {
    const newId = Math.max(...formData.curriculum.map((s: CurriculumSection) => s.id)) + 1
    setFormData({
      ...formData,
      curriculum: [
        ...formData.curriculum,
        {
          id: newId,
          title: '',
          items: [
            {
              id: 1,
              title: '',
              hours: '0',
              minutes: '0',
              isLocked: false,
              videoUrl: ''
            }
          ]
        }
      ]
    })
  }

  const addCurriculumItem = (sectionIndex: number) => {
    const newCurriculum = [...formData.curriculum]
    const newId = Math.max(...newCurriculum[sectionIndex].items.map((i: CurriculumItem) => i.id)) + 1
    
    newCurriculum[sectionIndex].items.push({
      id: newId,
      title: '',
      hours: '0',
      minutes: '0',
      videoUrl: '',
      isLocked: false
    })
    
    setFormData({ ...formData, curriculum: newCurriculum })
  }

  const removeCurriculumSection = (sectionIndex: number) => {
    const newCurriculum = formData.curriculum.filter((_: CurriculumSection, i: number) => i !== sectionIndex)
    setFormData({ ...formData, curriculum: newCurriculum })
  }

  const removeCurriculumItem = (sectionIndex: number, itemIndex: number) => {
    const newCurriculum = [...formData.curriculum]
    newCurriculum[sectionIndex].items = newCurriculum[sectionIndex].items.filter(
      (_: CurriculumItem, i: number) => i !== itemIndex
    )
    setFormData({ ...formData, curriculum: newCurriculum })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/kurslar', {
        method: initialData ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(initialData ? { ...formData, id: initialData.id } : formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Bir hata oluştu')
      }

      router.push('/admin/kurslar')
      router.refresh()
    } catch (error) {
      console.error('Form gönderim hatası:', error)
      alert(error instanceof Error ? error.message : 'Bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Temel Bilgiler */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Temel Bilgiler</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Başlık
            </label>
            <input
              type="text"
              required
              value={formData.baslik}
              onChange={(e) => setFormData({ ...formData, baslik: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Etiket
            </label>
            <input
              type="text"
              required
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Fiyat
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.fiyat}
              onChange={(e) => setFormData({ ...formData, fiyat: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Kategori
            </label>
            <select
              required
              value={formData.kategoriId}
              onChange={(e) => setFormData({ ...formData, kategoriId: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Kategori seçin</option>
              {kategoriler.map((kategori: Kategori) => (
                <option key={kategori.id} value={kategori.id}>
                  {kategori.isim}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Eğitmen
            </label>
            <select
              required
              value={formData.ogretmenId}
              onChange={(e) => setFormData({ ...formData, ogretmenId: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Eğitmen seçin</option>
              {ogretmenler.map((ogretmen: User) => (
                <option key={ogretmen.id} value={ogretmen.id}>
                  {ogretmen.ad} {ogretmen.soyad}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kurs Resmi
            </label>
            <div className="space-y-4">
              {formData.resimUrl ? (
                <div className="relative w-full max-w-md">
                  <Image
                    src={formData.resimUrl}
                    alt="Kurs resmi"
                    width={400}
                    height={225}
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleImageRemove}
                    className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-center w-full max-w-md">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Resim yüklemek için tıklayın</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG (MAX. 5MB)</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              )}
              {uploading && (
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Resim yükleniyor...
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Açıklama
            </label>
            <textarea
              required
              rows={4}
              value={formData.aciklama}
              onChange={(e) => setFormData({ ...formData, aciklama: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Neler Öğreneceksiniz */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Neler Öğreneceksiniz?</h2>
        <div className="space-y-4">
          {formData.whatYouWillLearn.map((item: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                required
                value={item}
                onChange={(e) => handleWhatYouWillLearnChange(index, e.target.value)}
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeWhatYouWillLearnItem(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addWhatYouWillLearnItem}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Ekle</span>
          </button>
        </div>
      </div>

      {/* Gereksinimler */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Gereksinimler</h2>
        <div className="space-y-4">
          {formData.requirements.map((item: string, index: number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                required
                value={item}
                onChange={(e) => handleRequirementsChange(index, e.target.value)}
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => removeRequirementItem(index)}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addRequirementItem}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Ekle</span>
          </button>
        </div>
      </div>

      {/* Müfredat */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Müfredat</h3>
        
        {formData.curriculum.map((section, sectionIndex) => (
          <div key={section.id} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <input
                type="text"
                value={section.title}
                onChange={(e) => handleCurriculumChange(sectionIndex, null, 'title', e.target.value)}
                placeholder="Bölüm Başlığı"
                className="flex-1 mr-4 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => removeCurriculumSection(sectionIndex)}
                className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {section.items.map((item, itemIndex) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleCurriculumChange(sectionIndex, itemIndex, 'title', e.target.value)}
                      placeholder="Video Başlığı"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        value={item.hours}
                        onChange={(e) => handleCurriculumChange(sectionIndex, itemIndex, 'hours', e.target.value)}
                        placeholder="Saat"
                        className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-600 dark:text-gray-400">sa</span>
                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={item.minutes}
                        onChange={(e) => handleCurriculumChange(sectionIndex, itemIndex, 'minutes', e.target.value)}
                        placeholder="Dakika"
                        className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <span className="text-gray-600 dark:text-gray-400">dk</span>
                    </div>
                    <input
                      type="url"
                      value={item.videoUrl || ''}
                      onChange={(e) => handleCurriculumChange(sectionIndex, itemIndex, 'videoUrl', e.target.value)}
                      placeholder="Video URL"
                      className="w-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <input
                        type="checkbox"
                        checked={item.isLocked}
                        onChange={(e) => handleCurriculumChange(sectionIndex, itemIndex, 'isLocked', e.target.checked)}
                        className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                      />
                      Kilitli
                    </label>
                    <button
                      type="button"
                      onClick={() => removeCurriculumItem(sectionIndex, itemIndex)}
                      className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => addCurriculumItem(sectionIndex)}
                className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ders Ekle
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={addCurriculumSection}
          className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Yeni Bölüm Ekle
        </button>
      </div>

      {/* Video Önizleme URL */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Video Önizleme</h2>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Video URL (YouTube)
          </label>
          <input
            type="url"
            value={formData.videoUrl}
            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
            placeholder="https://www.youtube.com/watch?v=..."
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Kaynaklar */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Kaynaklar</h2>
        <div className="space-y-4">
          {formData.kaynaklar.map((kaynak: { baslik: string; url: string }, index: number) => (
            <div key={index} className="flex gap-4">
              <input
                type="text"
                value={kaynak.baslik}
                onChange={(e) => {
                  const yeniKaynaklar = [...formData.kaynaklar]
                  yeniKaynaklar[index].baslik = e.target.value
                  setFormData({ ...formData, kaynaklar: yeniKaynaklar })
                }}
                placeholder="Kaynak Başlığı"
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <input
                type="url"
                value={kaynak.url}
                onChange={(e) => {
                  const yeniKaynaklar = [...formData.kaynaklar]
                  yeniKaynaklar[index].url = e.target.value
                  setFormData({ ...formData, kaynaklar: yeniKaynaklar })
                }}
                placeholder="Kaynak URL"
                className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => {
                  const yeniKaynaklar = formData.kaynaklar.filter((_, i) => i !== index)
                  setFormData({ ...formData, kaynaklar: yeniKaynaklar })
                }}
                className="p-2 text-red-600 hover:text-red-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData({
                ...formData,
                kaynaklar: [...formData.kaynaklar, { baslik: '', url: '' }]
              })
            }}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Plus className="h-5 w-5" />
            <span>Yeni Kaynak Ekle</span>
          </button>
        </div>
      </div>

      {/* Kaydet Butonu */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          İptal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Kaydediliyor...' : (initialData ? 'Güncelle' : 'Kaydet')}
        </button>
      </div>
    </form>
  )
} 