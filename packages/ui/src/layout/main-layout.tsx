import { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'

type MainLayoutProps = {
  left: ReactNode
  middle: ReactNode
  right: ReactNode
}

export default function MainLayout({ left, middle, right }: MainLayoutProps) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex justify-between p-4">
        {left}
        {middle}
        {right}
      </div>

      <div className="flex-1 px-4">
        <Outlet />
      </div>
    </div>
  )
}
