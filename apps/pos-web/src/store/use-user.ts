import { User } from '@app/auth-service/types/user'
import { create } from 'zustand'

type UserState = {
  user: User | undefined
  setUser: (user: User) => void
}

export const useUserStore = create<UserState>(set => ({
  user: undefined,
  setUser: user => set({ user })
}))
