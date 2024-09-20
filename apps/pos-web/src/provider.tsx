import { PropsWithChildren } from 'react'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { ThemeProvider } from '@/components/theme-provider'

const queryClient = new QueryClient()

export function Providers({ children }: PropsWithChildren) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>{children}</ThemeProvider>
      </QueryClientProvider>
    </CookiesProvider>
  )
}
