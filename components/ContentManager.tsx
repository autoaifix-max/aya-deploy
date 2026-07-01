'use client'

import { useApp } from '@/context/AppContext'
import TabToday from './tabs/TabToday'
import TabStatus from './tabs/TabStatus'
import TabNeeds from './tabs/TabNeeds'
import TabDoctor from './tabs/TabDoctor'
import TabAlerts from './tabs/TabAlerts'

export default function ContentManager() {
  const { state } = useApp()

  return (
    <div className="min-h-screen bg-[#FBF7EF]">
      {state.currentTab === 'today' && <TabToday />}
      {state.currentTab === 'status' && <TabStatus />}
      {state.currentTab === 'needs' && <TabNeeds />}
      {state.currentTab === 'doctor' && <TabDoctor />}
      {state.currentTab === 'alerts' && <TabAlerts />}
    </div>
  )
}
