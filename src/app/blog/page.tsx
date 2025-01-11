import BlogList from '@/components/blog/BlogList'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

const dummyPosts = [
  {
    title: "Muhasebe İşlemlerini Nasıl Hızlandırabilirsiniz?",
    description: "İşletmenizin muhasebe süreçlerini optimize etmek ve verimliliği artırmak için önemli ipuçları...",
    category: "Muhasebe",
    image: "/images/blog/accounting.jpg",
    slug: "muhasebe-islemlerini-nasil-hizlandirabilirsiniz",
    author: {
      name: "Ayşe Yılmaz",
      avatar: "/images/avatars/avatar-1.jpg"
    },
    date: "9 Nisan 2024"
  },
  {
    title: "Dijital Pazarlama ve SEO Stratejileri",
    description: "Modern dijital pazarlama teknikleri ve SEO optimizasyonu ile web sitenizi üst sıralara taşıyın...",
    category: "Pazarlama",
    image: "/images/blog/marketing.jpg",
    slug: "dijital-pazarlama-ve-seo-stratejileri",
    author: {
      name: "Mehmet Demir",
      avatar: "/images/avatars/avatar-2.jpg"
    },
    date: "8 Nisan 2024"
  },
  {
    title: "Online Eğitimde Başarının Sırları",
    description: "Online eğitim sürecinde maksimum verim almak için dikkat edilmesi gereken püf noktaları...",
    category: "Eğitim",
    image: "/images/blog/education.jpg",
    slug: "online-egitimde-basarinin-sirlari",
    author: {
      name: "Zeynep Kaya",
      avatar: "/images/avatars/avatar-3.jpg"
    },
    date: "7 Nisan 2024"
  }
]

export default function BlogPage() {
  return (
    <main className="py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Blog", href: "/blog" },
          ]}
          title="Blog"
          description="En son haberler, güncellemeler ve eğitim içerikleri"
        />
        <BlogList posts={dummyPosts} />
      </div>
    </main>
  )
} 