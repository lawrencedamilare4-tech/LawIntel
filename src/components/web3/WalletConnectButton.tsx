import { useNavigate } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/Button'
import { useEffect } from 'react'

export function WalletConnectButton() {
  const navigate = useNavigate()
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()
  const { user, setUser, signOut } = useAuthStore()

  useEffect(() => {
    setUser(address)
  }, [address, setUser])

//   useEffect(() => {
//   // If Wagmi is not connected but the store thinks it is, clear the stale auth
//   if (!isConnected && user) {
//     signOut()
//     return
//   }
//   // Normal sync: set the authenticated user from the connected wallet address
//   setUser(address)
// }, [address, isConnected, setUser, signOut, user])

  const handleDisconnect = () => {
    disconnect()
    signOut()
    navigate('/', { replace: true })
  }

  if (!isConnected) {
    return <ConnectButton showBalance={false} chainStatus="icon" />
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-text-muted font-mono">
        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''}
      </span>
      <Button variant="ghost" size="sm" onClick={handleDisconnect}>
        Disconnect
      </Button>
    </div>
  )
}