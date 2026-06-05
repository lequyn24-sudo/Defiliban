import { PriceTicker } from '@/components/layout/PriceTicker'
import { Navbar } from '@/components/layout/Navbar'
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
      <main
        style={{ minHeight: '100vh', background: 'var(--bg-page)' }}
      >
        {children}
      </main>
      <Footer />
    </>
  )
}
