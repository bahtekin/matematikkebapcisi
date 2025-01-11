import Image from 'next/image'
import { Breadcrumb } from '@/components/ui/Breadcrumb'

// Bu fonksiyon gerçek bir API'den veri çekmek için kullanılacak
async function getBlogPost(slug: string) {
  // Örnek veri
  return {
    title: "Muhasebe İşlemlerini Nasıl Hızlandırabilirsiniz?",
    description: "İşletmenizin muhasebe süreçlerini optimize etmek ve verimliliği artırmak için önemli ipuçları...",
    content: `
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      <h2>Alt Başlık 1</h2>
      <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <h2>Alt Başlık 2</h2>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    `,
    category: "Muhasebe",
    image: "/images/blog/accounting.jpg",
    author: {
      name: "Ayşe Yılmaz",
      avatar: "/images/avatars/avatar-1.jpg"
    },
    date: "9 Nisan 2024"
  }
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string }
}) {
  const post = await getBlogPost(params.slug)

  return (
    <main className="py-8 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title, href: `/blog/${params.slug}` },
          ]}
          title={post.title}
          description={post.description}
          instructor={{
            name: post.author.name,
            avatar: post.author.avatar
          }}
        />
        
        <article className="mt-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-8">
            <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm text-green-600 dark:bg-green-900/30 dark:text-green-400">
              {post.category}
            </span>
            
            <div 
              className="prose prose-lg mt-8 max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>
      </div>
    </main>
  )
} 