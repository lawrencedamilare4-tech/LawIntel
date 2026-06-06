import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: { id: string; wallet_address: string } | null
  isAuthenticated: boolean
  setUser: (address: `0x${string}` | undefined) => void
  signOut: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setUser: (address) => {
        if (!address) {
          set({ user: null, isAuthenticated: false })
          return
        }
        const walletAddress = address.toLowerCase()
        set({
          user: {
            id: walletAddress,
            wallet_address: walletAddress,
          },
          isAuthenticated: true,
        })
      },

      signOut: () => {
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'lawintel-auth',   // localStorage key
    }
  )
)