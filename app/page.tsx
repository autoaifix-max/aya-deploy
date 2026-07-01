import Header from '@/components/Header'
import ContentManager from '@/components/ContentManager'
import BottomNav from '@/components/BottomNav'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FBF7EF]">
      <Header />
      <ContentManager />
      <BottomNav />
    </div>
  )
}
