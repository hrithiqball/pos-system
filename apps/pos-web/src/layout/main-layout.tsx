import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'

type MainLayoutProps = {
  left: ReactNode
  right: ReactNode
}

export function MainLayout({ left, right }: MainLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex justify-between p-4">
        {left}
        {right}
      </div>

      <div className="flex-1 pr-4">
        <div className="flex h-full">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
