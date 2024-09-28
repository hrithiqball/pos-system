import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoadingPage from '@pkg/ui/pages/loading-page'

import { BrandSearch } from '@/components/brand-search'
import { UserMenu } from '@/components/user-menu'
import { MainLayout } from '@/layout/main-layout'
import { CashierPage } from '@/pages/cashier-page'
import { CustomersPage } from '@/pages/customers-page'
import { DisplayPage } from '@/pages/display-page'
import { HomePage } from '@/pages/home-page'
import { LoginPage } from '@/pages/login-page'
import { ReportsPage } from '@/pages/reports-page'
import { SettingsPage } from '@/pages/settings-page'
import { TablePage } from '@/pages/table-page'

const NotFoundPage = lazy(() => import('@pkg/ui/pages/not-found-page'))

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage lazy />}>
        <Routes>
          <Route path="/" element={<MainLayout left={<BrandSearch />} right={<UserMenu />} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/:type" element={<HomePage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/table" element={<TablePage />} />
            <Route path="/cashier" element={<CashierPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings/:type" element={<SettingsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/display" element={<DisplayPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
