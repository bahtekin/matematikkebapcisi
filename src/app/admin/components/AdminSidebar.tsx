'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  GraduationCap,
  FolderTree, 
  ShoppingCart, 
  FileText 
} from 'lucide-react'

const menuItems = [
  {
    title: 'Panel',
    href: '/admin',
    icon: LayoutDashboard
  },
  {
    title: 'Kurslar',
    href: '/admin/kurslar',
    icon: BookOpen
  },
  {
    title: 'Kategoriler',
    href: '/admin/kategoriler',
    icon: FolderTree
  },
  {
    title: 'Eğitmenler',
    href: '/admin/egitmenler',
    icon: GraduationCap
  },
  {
    title: 'Kullanıcılar',
    href: '/admin/kullanicilar',
    icon: Users
  },
  {
    title: 'Siparişler',
    href: '/admin/siparisler',
    icon: ShoppingCart
  },
  {
    title: 'Blog',
    href: '/admin/blog',
    icon: FileText
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                  isActive
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
} 