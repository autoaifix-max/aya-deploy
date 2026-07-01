'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface AppState {
  darkMode: boolean
  currentTab: string
  waterCount: number
  selectedSymptom: string | null
  ahmedMessageIndex: number
  babyMessageIndex: number
}

interface AppContextType {
  state: AppState
  setDarkMode: (value: boolean) => void
  setCurrentTab: (tab: string) => void
  addWater: () => void
  removeWater: () => void
  setSelectedSymptom: (symptom: string | null) => void
  nextAhmedMessage: () => void
  nextBabyMessage: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    darkMode: false,
    currentTab: 'today',
    waterCount: 0,
    selectedSymptom: null,
    ahmedMessageIndex: 0,
    babyMessageIndex: 0,
  })

  useEffect(() => {
    const saved = localStorage.getItem('darkMode')
    if (saved) {
      setState(prev => ({ ...prev, darkMode: JSON.parse(saved) }))
    }
  }, [])

  const setDarkMode = (value: boolean) => {
    setState(prev => ({ ...prev, darkMode: value }))
    localStorage.setItem('darkMode', JSON.stringify(value))
    document.documentElement.classList.toggle('dark', value)
  }

  const setCurrentTab = (tab: string) => {
    setState(prev => ({ ...prev, currentTab: tab }))
  }

  const addWater = () => {
    setState(prev => ({ ...prev, waterCount: Math.min(prev.waterCount + 1, 8) }))
  }

  const removeWater = () => {
    setState(prev => ({ ...prev, waterCount: Math.max(prev.waterCount - 1, 0) }))
  }

  const setSelectedSymptom = (symptom: string | null) => {
    setState(prev => ({ ...prev, selectedSymptom: symptom }))
  }

  const nextAhmedMessage = () => {
    setState(prev => ({ ...prev, ahmedMessageIndex: (prev.ahmedMessageIndex + 1) % 9 }))
  }

  const nextBabyMessage = () => {
    setState(prev => ({ ...prev, babyMessageIndex: (prev.babyMessageIndex + 1) % 9 }))
  }

  return (
    <AppContext.Provider
      value={{
        state,
        setDarkMode,
        setCurrentTab,
        addWater,
        removeWater,
        setSelectedSymptom,
        nextAhmedMessage,
        nextBabyMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
