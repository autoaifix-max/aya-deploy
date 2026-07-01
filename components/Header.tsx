'use client'

import { useApp } from '@/context/AppContext'

export default function Header() {
  const { state, setDarkMode } = useApp()

  return (
    <header className="bg-gradient-to-r from-[#24463A] to-[#3A5C4D] text-white p-6 text-center shadow-lg">
      <h1 className="font-[Aref_Ruqaa] text-2xl mb-1">رحلة آية 💚</h1>
      <div className="text-sm opacity-90">دليلك الموثوق في رحلة الحمل</div>
      <button
        onClick={() => setDarkMode(!state.darkMode)}
        className="fixed top-5 left-5 z-1000 bg-[#24463A] text-white w-11 h-11 rounded-full cursor-pointer text-xl flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        {state.darkMode ? '☀️' : '🌙'}
      </button>
    </header>
  )
}
