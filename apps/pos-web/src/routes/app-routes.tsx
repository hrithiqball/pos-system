import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from '@pkg/ui/layout/main-layout'
import LoadingPage from '@pkg/ui/pages/loading-page'

import { BrandSearch } from '@/components/brand-search'
import { UserMenu } from '@/components/user-menu'
import { LoginPage } from '@/pages/login-page'

const NotFoundPage = lazy(() => import('@pkg/ui/pages/not-found-page'))

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage lazy />}>
        <Routes>
          <Route path="/" element={<MainLayout left={<BrandSearch />} right={<UserMenu />} />}>
            <Route index element={<span>home</span>} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
