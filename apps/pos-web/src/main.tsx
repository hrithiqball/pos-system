import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'

import { Providers } from '@/provider'
import AppRoutes from '@/routes/app-routes'

import '@/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors />
    <Providers>
      <AppRoutes />
    </Providers>
  </StrictMode>
)
