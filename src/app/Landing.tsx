import { useEffect, useState } from 'react'
import { Shield, ArrowRight } from 'lucide-react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useSignMessage } from 'wagmi'
import { useAuthStore } from '@/stores/authStore'
import { Navigate } from 'react-router-dom'

export function Landing() {
  const { address, isConnected } = useAccount()
  const { signMessageAsync } = useSignMessage()
  const { setUser, isAuthenticated } = useAuthStore()
  const [signingIn, setSigningIn] = useState(false)

  // Redirect if already authenticated
  if (isAuthenticated) return <Navigate to="/dashboard" replace />

  const handleSignIn = async () => {
    if (!address || signingIn) return
    setSigningIn(true)
    try {
      await signMessageAsync({ message: 'Sign in to LawIntel' })
      setUser(address) // authenticate on success
    } catch (error) {
      console.error('Signature failed:', error)
    } finally {
      setSigningIn(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-cream text-brown-900 font-sans flex flex-col overflow-hidden">
      {/* --- Grain overlay and accent (keep your existing) --- */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.022]"
        style={{
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />
      <div
        className="fixed top-[-120px] right-[-120px] w-[420px] h-[420px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
      />

      {/* --- Header --- */}
      <header className="relative z-10 border-b border-brown-400/15 bg-cream/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto h-16 px-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <div className="relative w-9 h-9 border border-gold-400 flex items-center justify-center
                            before:absolute before:inset-[3px] before:border before:border-gold-200">
              <Shield size={14} className="text-gold-400" strokeWidth={1.5} />
            </div>
            <span className="font-serif text-lg font-medium tracking-[0.04em] text-brown-900">
              LawIntel
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-xs uppercase tracking-widest text-brown-400 hover:text-gold-600 transition-colors">Product</a>
            <a href="#" className="text-xs uppercase tracking-widest text-brown-400 hover:text-gold-600 transition-colors">Docs</a>
            <a href="#" className="text-xs uppercase tracking-widest text-brown-400 hover:text-gold-600 transition-colors">Security</a>
          </nav>

          {/* Top bar connect/sign button */}
          <ConnectButton.Custom>
            {({ openConnectModal, mounted }) => {
              if (!mounted) return null
              if (!isConnected) {
                return (
                  <button
                    onClick={openConnectModal}
                    className="h-10 px-5 border border-brown-400/30 bg-transparent text-xs uppercase tracking-widest text-brown-700 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50 transition-colors"
                  >
                    Connect Wallet
                  </button>
                )
              }
              return (
                <button
                  onClick={handleSignIn}
                  disabled={signingIn}
                  className="h-10 px-5 border border-brown-400/30 bg-transparent text-xs uppercase tracking-widest text-brown-700 hover:border-gold-400 hover:text-gold-600 hover:bg-gold-50 transition-colors disabled:opacity-50"
                >
                  {signingIn ? 'Signing…' : 'Sign In'}
                </button>
              )
            }}
          </ConnectButton.Custom>
        </div>
      </header>

      {/* --- Hero --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-10 py-20 text-center">
        <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brown-400 border border-brown-400/15 px-4 py-1.5 bg-white/50 mb-10 animate-fade-up">
          Onchain Transaction Intelligence
        </div>

        <div className="w-10 h-px bg-gold-400 mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.15s' }} />

        <h1 className="font-serif text-6xl md:text-8xl font-light leading-tight tracking-[-0.01em] text-brown-900 max-w-4xl mx-auto mb-3 animate-fade-up" style={{ animationDelay: '0.25s' }}>
          Know exactly<br />
          <em className="italic text-gold-600">what you sign.</em>
        </h1>

        <p className="text-base md:text-lg font-light leading-relaxed text-brown-400 max-w-xl mx-auto mb-14 animate-fade-up" style={{ animationDelay: '0.38s' }}>
          LawIntel runs every transaction through a simulation engine,
          explains it in plain English, and delivers a risk score —
          before you approve anything.
        </p>

        <div className="animate-fade-up" style={{ animationDelay: '0.50s' }}>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {/* Hero connect/sign button */}
            <ConnectButton.Custom>
              {({ openConnectModal, mounted }) => {
                if (!mounted) return null
                if (!isConnected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="group/btn relative overflow-hidden h-[52px] px-9 border border-gold-400 bg-transparent text-xs font-medium uppercase tracking-[0.12em] text-gold-600
                                 before:absolute before:inset-0 before:bg-gold-400 before:-translate-x-[101%] before:transition-transform before:duration-300 before:ease-out enabled:hover:before:translate-x-0
                                 enabled:hover:text-white enabled:hover:border-gold-400"
                    >
                      <span className="relative z-10">Connect Wallet</span>
                      <ArrowRight size={14} strokeWidth={1.5} className="relative z-10 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                    </button>
                  )
                }
                return (
                  <button
                    onClick={handleSignIn}
                    disabled={signingIn}
                    className="group/btn relative overflow-hidden h-[52px] px-9 border border-gold-400 bg-transparent text-xs font-medium uppercase tracking-[0.12em] text-gold-600
                               before:absolute before:inset-0 before:bg-gold-400 before:-translate-x-[101%] before:transition-transform before:duration-300 before:ease-out enabled:hover:before:translate-x-0
                               enabled:hover:text-white enabled:hover:border-gold-400 disabled:opacity-50"
                  >
                    <span className="relative z-10">{signingIn ? 'Signing…' : 'Sign In to Analyse'}</span>
                    <ArrowRight size={14} strokeWidth={1.5} className="relative z-10 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" />
                  </button>
                )
              }}
            </ConnectButton.Custom>
          </div>
          <p className="mt-5 text-xs tracking-[0.06em] text-brown-400/80">
            No wallet access required to simulate
          </p>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="relative z-10 border-t border-brown-400/15 bg-cream/90">
        <div className="max-w-7xl mx-auto h-14 px-10 flex items-center justify-between">
          <span className="font-serif text-sm tracking-[0.04em] text-brown-400">LawIntel — Onchain Intelligence</span>
          <span className="text-xs tracking-[0.06em] text-brown-400/60">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  )
}