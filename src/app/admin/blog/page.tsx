"use client";

export default function BlogYonetimPage() {
  // Örnek veri - API entegrasyonu daha sonra yapılacak
  const bloglar = [
    {
      id: 1,
      baslik: "Matematik Öğrenmenin Püf Noktaları",
      tarih: "2024-01-15",
    },
    {
      id: 2,
      baslik: "TYT Matematikte Başarılı Olmanın Sırları",
      tarih: "2024-01-10",
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Yönetimi</h1>
        <button 
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          onClick={() => console.log("Yeni blog ekle")}
        >
          + Blog Yazısı Ekle
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Blog Başlığı</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarih</th>
              <th className="px-6 py-3 text-right text-sm font-semibold text-gray-900">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {bloglar.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{blog.baslik}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{blog.tarih}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100"
                      onClick={() => console.log("Düzenle", blog.id)}
                    >
                      Düzenle
                    </button>
                    <button 
                      className="px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100"
                      onClick={() => console.log("Sil", blog.id)}
                    >
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 