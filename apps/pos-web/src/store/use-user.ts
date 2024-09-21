import { create } from 'zustand'

import { User } from '@/types/user'

type UserState = {
  user: User | undefined
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>(set => ({
  user: undefined,
  setUser: user => set({ user })
}))
