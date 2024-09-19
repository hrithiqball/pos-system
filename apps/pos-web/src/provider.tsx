import { PropsWithChildren } from 'react'
import { CookiesProvider } from 'react-cookie'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children }: PropsWithChildren) {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </CookiesProvider>
  )
}
