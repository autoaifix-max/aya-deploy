'use client'

import { useApp } from '@/context/AppContext'

const TAB_ITEMS = [
  { id: 'today', icon: '🏠', label: 'الرئيسية' },
  { id: 'status', icon: '💬', label: 'الحالة' },
  { id: 'needs', icon: '💧', label: 'الصحة' },
  { id: 'doctor', icon: '⚕️', label: 'الطبيب' },
  { id: 'alerts', icon: '⚠️', label: 'التنبيهات' },
]

export default function BottomNav() {
  const { state, setCurrentTab } = useApp()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#EADFC7] flex justify-around items-center h-[70px] shadow-lg z-100">
      {TAB_ITEMS.map(item => (
        <button
          key={item.id}
          onClick={() => setCurrentTab(item.id)}
          className={`flex flex-col items-center justify-center cursor-pointer text-xs px-2 py-2 transition-colors ${
            state.currentTab === item.id ? 'text-[#24463A]' : 'text-[#6F6A5C]'
          }`}
        >
          <div className="text-2xl mb-1">{item.icon}</div>
          <div className="text-[11px]">{item.label}</div>
        </button>
      ))}
    </nav>
  )
}
