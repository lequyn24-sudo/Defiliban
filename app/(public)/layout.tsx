import { PriceTicker } from '@/components/layout/PriceTicker'
import { Navbar } from '@/components/layout/Navbar'
import { SubNav } from '@/components/layout/SubNav'
import { Footer } from '@/components/layout/Footer'

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PriceTicker />
      <Navbar />
      <SubNav />
      <main
        style={{ minHeight: '100vh', background: 'var(--bg-page)' }}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
