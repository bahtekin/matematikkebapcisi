'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminGiris() {
  const router = useRouter()
  const [yukleniyor, setYukleniyor] = useState(false)
  const [girisVerileri, setGirisVerileri] = useState({
    email: '',
    sifre: ''
  })

  const girisYap = async (e: React.FormEvent) => {
    e.preventDefault()
    if (yukleniyor) return
    setYukleniyor(true)

    try {
      const res = await fetch('/api/admin/giris', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(girisVerileri),
        credentials: 'same-origin'
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Giriş yapılırken bir hata oluştu')
      }

      toast.success('Giriş başarılı!')
      
      window.location.href = '/admin'
    } catch (error: any) {
      console.error('Giriş hatası:', error)
      toast.error(error.message || 'Giriş yapılırken bir hata oluştu.')
    } finally {
      setYukleniyor(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Lock className="h-12 w-12 text-blue-600 dark:text-blue-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Admin Girişi
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200 dark:border-gray-700">
          <form onSubmit={girisYap} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                E-posta
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={girisVerileri.email}
                  onChange={(e) => setGirisVerileri({ ...girisVerileri, email: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={yukleniyor}
                />
              </div>
            </div>

            <div>
              <label htmlFor="sifre" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Şifre
              </label>
              <div className="mt-1">
                <input
                  id="sifre"
                  name="sifre"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={girisVerileri.sifre}
                  onChange={(e) => setGirisVerileri({ ...girisVerileri, sifre: e.target.value })}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  disabled={yukleniyor}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={yukleniyor}
              >
                {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 