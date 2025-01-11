import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { Providers } from './providers'
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import { headers } from 'next/headers'
import NextTopLoader from 'nextjs-toploader'

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: '--font-plus-jakarta-sans'
})

export const metadata = {
  title: 'Matematikkebapçısı',
  description: 'Matematik öğrenmenin en lezzetli yolu',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const currentPath = headersList.get('x-invoke-path') || ''
  const isAdminPage = currentPath.includes('/admin')

  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={plusJakartaSans.className}>
        <NextTopLoader 
          color="#2563eb"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Providers>
          <div className="min-h-screen flex flex-col">
            {!isAdminPage && <Header />}
            <main className="flex-1">
              <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 max-w-[1400px]">
                {children}
              </div>
            </main>
            {!isAdminPage && <Footer />}
          </div>
        </Providers>
      </body>
    </html>
  )
}
