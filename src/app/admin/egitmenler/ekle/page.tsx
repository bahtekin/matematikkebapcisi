import EgitmenForm from '../components/EgitmenForm'

export default function EgitmenEklePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Yeni Eğitmen Ekle</h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <EgitmenForm initialData={null} />
      </div>
    </div>
  )
} 