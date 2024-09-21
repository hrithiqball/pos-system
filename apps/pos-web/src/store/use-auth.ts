import { create } from 'zustand'

type AuthState = {
  isAuthenticated: boolean
  setAuthenticated: (authenticated: boolean) => void
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  setAuthenticated: authenticated => set({ isAuthenticated: authenticated })
}))
